import React from "react";

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="c">C</option>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
    </select>
  );
};

export default LanguageSelector;
