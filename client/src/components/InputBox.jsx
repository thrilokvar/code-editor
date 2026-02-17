import React from "react";

const InputBox = ({ input, setInput }) => {
  return (
    <textarea
      rows="5"
      cols="50"
      placeholder="Custom Input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default InputBox;
