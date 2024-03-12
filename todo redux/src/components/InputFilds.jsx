import React from "react";

const InputFilds = ({ title, setTitle, addTask }) => {
  return (
    <label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>add todo</button>
    </label>
  );
};

export default InputFilds;
