import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <Editor
      height="300px"
      language={language}
      value={code}
      onChange={(value) => setCode(value)}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
