import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  theme?: string;
  fontSize?: number;
  tabSize?: number;
}

export default function CodeEditor({ 
  code, 
  setCode, 
  language,
  theme = 'vs-dark',
  fontSize = 14,
  tabSize = 4
}: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Map theme values to Monaco editor themes
  const getMonacoTheme = (theme: string) => {
    switch (theme) {
      case 'light':
        return 'vs';
      case 'dark':
        return 'vs-dark';
      default:
        return theme;
    }
  };

  return (
    <div className={`h-full w-full ${theme === 'light' ? 'bg-white' : 'bg-[#1E1E1E]'}`}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={handleEditorChange}
        theme={getMonacoTheme(theme)}
        options={{
          minimap: { enabled: false },
          fontSize,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          suggestOnTriggerCharacters: true,
          parameterHints: {
            enabled: true
          },
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            bracketPairs: true
          },
          tabSize,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          'semanticHighlighting.enabled': true
        }}
      />
    </div>
  );
} 