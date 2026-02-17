import React from "react";

const OutputBox = ({ output, verdict }) => {
  return (
    <div>
      {verdict && <h3>Verdict: {verdict}</h3>}
      <pre>{output}</pre>
    </div>
  );
};

export default OutputBox;
