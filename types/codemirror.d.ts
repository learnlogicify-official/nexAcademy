declare module '@uiw/react-codemirror' {
  import { ComponentType } from 'react';

  interface CodeMirrorProps {
    value: string;
    height?: string;
    theme?: any;
    extensions?: any[];
    onChange?: (value: string) => void;
    options?: {
      lineNumbers?: boolean;
      lineWrapping?: boolean;
      indentUnit?: number;
      tabSize?: number;
      autoCloseBrackets?: boolean;
      matchBrackets?: boolean;
      indentWithTabs?: boolean;
      extraKeys?: {
        [key: string]: string;
      };
    };
  }

  const CodeMirror: ComponentType<CodeMirrorProps>;
  export default CodeMirror;
}

declare module '@codemirror/lang-python' {
  export function python(): any;
}

declare module '@uiw/codemirror-theme-vscode' {
  const theme: any;
  export default theme;
} 