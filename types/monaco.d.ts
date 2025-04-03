declare module '@monaco-editor/react' {
  import { ComponentType } from 'react';

  interface EditorProps {
    height?: string | number;
    defaultLanguage?: string;
    theme?: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
    onMount?: (editor: any) => void;
    options?: {
      minimap?: { enabled: boolean };
      fontSize?: number;
      lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
      scrollBeyondLastLine?: boolean;
      automaticLayout?: boolean;
      padding?: { top: number; bottom: number };
      fontFamily?: string;
      wordWrap?: 'on' | 'off';
      renderWhitespace?: 'none' | 'boundary' | 'selection' | 'all';
      tabSize?: number;
      insertSpaces?: boolean;
      bracketPairColorization?: { enabled: boolean };
      guides?: { bracketPairs: boolean };
      suggestOnTriggerCharacters?: boolean;
      quickSuggestions?: boolean;
      parameterHints?: { enabled: boolean };
      snippetSuggestions?: 'top' | 'bottom' | 'inline';
      formatOnPaste?: boolean;
      formatOnType?: boolean;
    };
  }

  const Editor: ComponentType<EditorProps>;
  export default Editor;
} 