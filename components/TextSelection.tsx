import React, { useState } from "react";

const TextSelection = () => {
  const [text, setText] = useState("Three fruits are: apples, mango, banana.");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  return (
    <div>
      <div className="flex flex-col">
        {text}
        <div className="flex justify-between space-x-4">
          <input
            type="range"
            min={0}
            max={text.length}
            step={1}
            value={startIndex}
            onChange={(e) => setStartIndex(e.target.value)}
          />{" "}
          <br />
          <input
            type="range"
            min={0}
            max={text.length}
            step={1}
            value={endIndex}
            onChange={(e) => setEndIndex(e.target.value)}
          />
        </div>
      </div>

      <div className="flex">
        Selected Text: {text.slice(startIndex, endIndex)}
      </div>
    </div>
  );
};

export default TextSelection;
