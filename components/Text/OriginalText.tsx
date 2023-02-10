import React, { useState } from "react";

interface OriginalTextProps {
  text: string;
  handleClick: (index: number) => void;
  highlightText: (index: number, word: string) => string;
}

const OriginalText: React.FC<OriginalTextProps> = ({
  text,
  handleClick,
  highlightText,
}) => {
  return (
    <div className="text-xl">
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className={`inline-block p-2 m-2 rounded ${highlightText(
            index,
            word
          )}`}
          onClick={() => handleClick(index)}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
};

export default OriginalText;
