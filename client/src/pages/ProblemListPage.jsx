import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import { Link } from "react-router-dom";

function ProblemListPage() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await API.get("/problems");
      setProblems(res.data);
    };
    fetchProblems();
  }, []);

  return (
    <div className="container">
      <h2>Problems</h2>
      {problems.map((problem) => (
        <div key={problem._id} className="problemCard">
          <Link to={`/problem/${problem._id}`} style={{ color: "blue" }}>
            {problem.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProblemListPage;
