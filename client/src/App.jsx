import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProblemListPage from "./pages/ProblemListPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProblemListPage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
