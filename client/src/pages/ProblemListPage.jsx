import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/problems")
      .then(res => setProblems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Problems</h2>
      {problems.length === 0 ? (
        <p>No problems available</p>
      ) : (
        <ul>
          {problems.map(problem => (
            <li key={problem._id}>
              <Link to={`/problem/${problem._id}`}>{problem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProblemListPage;
