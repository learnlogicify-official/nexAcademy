import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFile, unlink, access } from 'fs/promises';
import { join, dirname } from 'path';
import { tmpdir } from 'os';

export async function POST(request: Request) {
  let tempFile = '';
  let tempInputFile = '';
  let executableFile = '';
  
  try {
    const { code, input, expected_output, problemId, languageId } = await request.json();
    console.log('Received code:', code);
    console.log('Received input:', input);
    console.log('Received expected output:', expected_output);
    console.log('Received problem ID:', problemId);
    console.log('Received language ID:', languageId);

    // Create temporary files
    const fileExtension = getFileExtension(languageId);
    tempFile = join(tmpdir(), `code_${Date.now()}.${fileExtension}`);
    tempInputFile = join(tmpdir(), `input_${Date.now()}.txt`);
    executableFile = join(tmpdir(), `exec_${Date.now()}`);
    console.log('Created temporary files:', { tempFile, tempInputFile, executableFile });

    // Write input to a temporary file
    await writeFile(tempInputFile, input);
    console.log('Created temporary input file:', tempInputFile);
    console.log('Input content:', input);

    // Write the code to a temporary file
    await writeFile(tempFile, code);
    console.log('Created temporary file:', tempFile);
    console.log('Code content:', code);

    // Run the code based on language
    const startTime = Date.now();
    console.log('Starting process...');
    
    const { command, args } = getCommandForLanguage(languageId, tempFile, executableFile);
    console.log('Running command:', command, args);

    // For compiled languages, first compile then run
    if (languageId === 50 || languageId === 54 || languageId === 62) { // C, C++, Java
      const compileProcess = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let compileStderr = '';
      compileProcess.stderr.on('data', (data) => {
        compileStderr += data.toString();
      });

      await new Promise((resolve, reject) => {
        compileProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(compileStderr || 'Compilation failed'));
          } else {
            resolve(null);
          }
        });
      });

      // Run the compiled program
      const runCommand = languageId === 62 
        ? 'java' // For Java
        : executableFile; // For C/C++
      
      const runArgs = languageId === 62 
        ? ['-cp', dirname(tempFile), 'Solution'] // For Java
        : []; // For C/C++

      const runProcess = spawn(runCommand, runArgs, {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Write input to stdin
      runProcess.stdin.write(input);
      runProcess.stdin.end();

      // Collect output
      let stdout = '';
      let stderr = '';
      let error = null;

      // Handle stdout
      runProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        console.log('Received stdout:', data.toString());
      });

      // Handle stderr
      runProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        console.log('Received stderr:', data.toString());
      });

      // Handle process errors
      runProcess.on('error', (err) => {
        error = err;
        console.error('Process error:', err);
      });

      // Wait for the process to complete with timeout
      const timeout = 5000; // 5 seconds timeout
      const processPromise = new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          runProcess.kill();
          reject(new Error('Execution timed out'));
        }, timeout);

        runProcess.on('close', (code) => {
          clearTimeout(timeoutId);
          console.log('Process closed with code:', code);
          if (code !== 0) {
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

      const actualOutput = stdout.trim();
      const expectedOutput = expected_output.trim();
      const isCorrect = actualOutput === expectedOutput;

      return NextResponse.json({
        stdout: actualOutput,
        stderr: null,
        time: executionTime,
        status: {
          id: isCorrect ? 3 : 4,
          description: isCorrect ? 'Accepted' : 'Wrong Answer'
        }
      });
    } else {
      // For interpreted languages (Python, JavaScript)
      const process = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Write input to stdin
      process.stdin.write(input);
      process.stdin.end();

      // Collect output
      let stdout = '';
      let stderr = '';
      let error = null;

      // Handle stdout
      process.stdout.on('data', (data) => {
        stdout += data.toString();
        console.log('Received stdout:', data.toString());
      });

      // Handle stderr
      process.stderr.on('data', (data) => {
        stderr += data.toString();
        console.log('Received stderr:', data.toString());
      });

      // Handle process errors
      process.on('error', (err) => {
        error = err;
        console.error('Process error:', err);
      });

      // Wait for the process to complete with timeout
      const timeout = 5000; // 5 seconds timeout
      const processPromise = new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          process.kill();
          reject(new Error('Execution timed out'));
        }, timeout);

        process.on('close', (code) => {
          clearTimeout(timeoutId);
          console.log('Process closed with code:', code);
          if (code !== 0) {
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

      const actualOutput = stdout.trim();
      const expectedOutput = expected_output.trim();
      const isCorrect = actualOutput === expectedOutput;

      return NextResponse.json({
        stdout: actualOutput,
        stderr: null,
        time: executionTime,
        status: {
          id: isCorrect ? 3 : 4,
          description: isCorrect ? 'Accepted' : 'Wrong Answer'
        }
      });
    }
  } catch (error) {
    console.error('Error executing code:', error);
    
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

      if (executableFile) {
        try {
          await access(executableFile);
          await unlink(executableFile);
          console.log('Deleted executable file:', executableFile);
        } catch (err) {
          console.log('Error with executable file:', err);
        }
      }
    } catch (err) {
      console.log('Error during cleanup:', err);
    }
  }
}

function getFileExtension(languageId: number): string {
  switch (languageId) {
    case 71: // Python
      return 'py';
    case 50: // C
      return 'c';
    case 54: // C++
      return 'cpp';
    case 62: // Java
      return 'java';
    case 63: // JavaScript
      return 'js';
    default:
      throw new Error(`Unsupported language ID: ${languageId}`);
  }
}

function getCommandForLanguage(languageId: number, filePath: string, executablePath: string): { command: string; args: string[] } {
  switch (languageId) {
    case 71: // Python
      return {
        command: 'python3',
        args: [filePath]
      };
    case 50: // C
      return {
        command: 'gcc',
        args: [filePath, '-o', executablePath]
      };
    case 54: // C++
      return {
        command: 'g++',
        args: [filePath, '-o', executablePath]
      };
    case 62: // Java
      return {
        command: 'javac',
        args: [filePath]
      };
    case 63: // JavaScript
      return {
        command: 'node',
        args: [filePath]
      };
    default:
      throw new Error(`Unsupported language ID: ${languageId}`);
  }
} 