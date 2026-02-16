import Editor from "@monaco-editor/react";

function CodeEditor({ language, code, setCode }) {
  return (
    <Editor
      height="400px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value)}
    />
  );
}

export default CodeEditor;
