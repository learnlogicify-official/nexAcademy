declare module 'react-ace' {
  import { ComponentType } from 'react';

  interface AceEditorProps {
    mode?: string;
    theme?: string;
    onChange?: (value: string) => void;
    value?: string;
    name?: string;
    editorProps?: any;
    setOptions?: any;
  }

  const AceEditor: ComponentType<AceEditorProps>;
  export default AceEditor;
} 