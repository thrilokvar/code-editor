import React from "react";

function InputBox({ input, setInput }) {
  return (
    <textarea
      rows="5"
      className="inputBox"
      placeholder="Custom Input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}

export default InputBox;
