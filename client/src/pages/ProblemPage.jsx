import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";
import LanguageSelector from "../components/LanguageSelector";

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/problems")
      .then(res => setProblems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Coding Problems</h1>

      <div style={styles.grid}>
        {problems.map((problem) => (
          <div
            key={problem._id}
            style={styles.card}
            onClick={() => navigate(`/problem/${problem._id}`)}
          >
            <h2 style={styles.title}>{problem.title}</h2>
            <p style={styles.description}>
              {problem.description}
            </p>
            <button style={styles.button}>
              Solve Problem →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(to right, #141E30, #243B55)",
    minHeight: "100vh",
    color: "white",
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  title: {
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#6C63FF",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProblemsPage;