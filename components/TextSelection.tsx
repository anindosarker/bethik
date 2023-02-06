import React, { useState } from "react";

const TextSelection = () => {
  const [text, setText] = useState("Sample text here");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [selectedText, setSelectedText] = useState("");

  const handleSelection = (start, end) => {
    setStartIndex(start);
    setEndIndex(end);
    setSelectedText(text.slice(start, end));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={
              index >= startIndex && index < endIndex
                ? "bg-gray-200"
                : "bg-transparent"
            }
            onMouseDown={() => handleSelection(index, index + 1)}
            onMouseOver={(event) => {
              if (event.buttons === 1) {
                handleSelection(startIndex, index + 1);
              }
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="text-lg mt-4">Selected text: {selectedText}</div>
    </div>
  );
};

export default TextSelection;
