import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios.js";
import CodeEditor from "../components/CodeEditor.jsx";
import InputBox from "../components/InputBox.jsx";
import OutputBox from "../components/OutputBox.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";

function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await API.get(`/problems/${id}`);
      setProblem(res.data);
      setInput(res.data.sampleInput);
    };
    fetchProblem();
  }, [id]);

  const runCode = async () => {
    const res = await API.post("/run", { language, code, input });
    setOutput(res.data.output);
    setVerdict("");
  };

  const submitCode = async () => {
    const res = await API.post("/submit", { problemId: id, language, code });
    setVerdict(res.data.verdict);
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="problemLayout" style={{ display: "flex" }}>
      <div className="leftPanel" style={{ flex: 1, padding: "10px" }}>
        <h2>{problem.title}</h2>
        <p>{problem.description}</p>
        <h4>Sample Input</h4>
        <pre>{problem.sampleInput}</pre>
        <h4>Sample Output</h4>
        <pre>{problem.sampleOutput}</pre>
      </div>

      <div className="rightPanel" style={{ flex: 1, padding: "10px" }}>
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <CodeEditor language={language} code={code} setCode={setCode} />
        <InputBox input={input} setInput={setInput} />
        <div>
          <button onClick={runCode}>Run</button>
          <button onClick={submitCode}>Submit</button>
        </div>
        <OutputBox output={output} verdict={verdict} />
      </div>
    </div>
  );
}

export default ProblemPage;
