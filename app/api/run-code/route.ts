import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFile, unlink, access } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: Request) {
  let tempFile = '';
  let tempInputFile = '';
  
  try {
    const { code, input, expected_output, problemId } = await request.json();
    console.log('Received code:', code);
    console.log('Received input:', input);
    console.log('Received expected output:', expected_output);
    console.log('Received problem ID:', problemId);

    // Create temporary files
    tempFile = join(tmpdir(), `code_${Date.now()}.py`);
    tempInputFile = join(tmpdir(), `input_${Date.now()}.txt`);
    console.log('Created temporary files:', { tempFile, tempInputFile });

    // Write input to a temporary file
    await writeFile(tempInputFile, input);
    console.log('Created temporary input file:', tempInputFile);
    console.log('Input content:', input);

    // Write the code to a temporary file
    await writeFile(tempFile, code);
    console.log('Created temporary file:', tempFile);
    console.log('Code content:', code);

    // Run the Python code
    const startTime = Date.now();
    console.log('Starting Python process...');
    
    const pythonProcess = spawn('python3', [tempFile], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Write input to stdin
    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();

    // Collect output
    let stdout = '';
    let stderr = '';
    let error = null;

    // Handle stdout
    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log('Received stdout:', data.toString());
    });

    // Handle stderr
    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.log('Received stderr:', data.toString());
    });

    // Handle process errors
    pythonProcess.on('error', (err) => {
      error = err;
      console.error('Process error:', err);
    });

    // Wait for the process to complete with timeout
    const timeout = 5000; // 5 seconds timeout
    const processPromise = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('Execution timed out'));
      }, timeout);

      pythonProcess.on('close', (code) => {
        clearTimeout(timeoutId);
        console.log('Process closed with code:', code);
        if (code !== 0) {
          // If there's stderr, use that as the error message
          if (stderr) {
            reject(new Error(stderr.trim()));
          } else {
            reject(new Error(`Process exited with code ${code}`));
          }
        } else {
          resolve(null);
        }
      });
    });

    try {
      await processPromise;
    } catch (err) {
      throw err;
    }

    const executionTime = Date.now() - startTime;
    console.log('Execution completed in:', executionTime, 'ms');

    // If there's stderr, treat it as a runtime error
    if (stderr) {
      console.log('Error output detected:', stderr);
      return NextResponse.json({
        stdout: null,
        stderr: stderr.trim(),
        time: executionTime,
        status: {
          id: 11,
          description: 'Runtime Error'
        }
      });
    }

    // Compare actual output with expected output
    const actualOutput = stdout.trim();
    const expectedOutput = expected_output.trim();
    const isCorrect = actualOutput === expectedOutput;

    console.log('Output comparison:', {
      actual: actualOutput,
      expected: expectedOutput,
      isCorrect
    });

    return NextResponse.json({
      stdout: actualOutput,
      stderr: null,
      time: executionTime,
      status: {
        id: isCorrect ? 3 : 4,
        description: isCorrect ? 'Accepted' : 'Wrong Answer'
      }
    });
  } catch (error) {
    console.error('Error executing code:', error);
    
    // Return the error message with appropriate status
    return NextResponse.json({
      stdout: null,
      stderr: error instanceof Error ? error.message : 'Unknown error occurred',
      time: '0',
      status: {
        id: 11,
        description: 'Runtime Error'
      }
    });
  } finally {
    // Clean up temporary files
    try {
      // Check if files exist before trying to delete them
      if (tempFile) {
        try {
          await access(tempFile);
          await unlink(tempFile);
          console.log('Deleted temp file:', tempFile);
        } catch (err) {
          console.log('Error with temp file:', err);
        }
      }
      
      if (tempInputFile) {
        try {
          await access(tempInputFile);
          await unlink(tempInputFile);
          console.log('Deleted input file:', tempInputFile);
        } catch (err) {
          console.log('Error with input file:', err);
        }
      }
    } catch (err) {
      console.log('Error during cleanup:', err);
    }
  }
} 