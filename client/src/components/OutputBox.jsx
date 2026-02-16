import React from "react";

function OutputBox({ output, verdict }) {
  return (
    <div className="outputBox">
      <h4>Output:</h4>
      <pre>{output}</pre>

      {verdict && (
        <h3 className={verdict === "Accepted" ? "accepted" : "wrong"}>
          {verdict}
        </h3>
      )}
    </div>
  );
}

export default OutputBox;
