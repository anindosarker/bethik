import React, { useState } from "react";

const TextSelection = () => {
  const [text, setText] = useState("Sample text here");
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);

  const handleStartClick = (index) => {
    setStartIndex(index);
    setEndIndex(-1);
  };

  const handleEndClick = (index) => {
    setEndIndex(index);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        {text.split(" ").map((word, index) => (
          <div
            key={index}
            className="flex-row items-center cursor-pointer"
            onClick={() =>
              startIndex === -1
                ? handleStartClick(index)
                : handleEndClick(index)
            }
          >
            <div className="ml-2">{word}</div>
            <div className="flex">
              <div
                className={`${
                  startIndex === index ? "bg-red-500" : ""
                } h-8 w-8`}
              >
                {startIndex === index ? "⇧" : ""}
              </div>
              <div
                className={`${endIndex === index ? "bg-red-500" : ""} h-8 w-8`}
              >
                {endIndex === index ? "⇩" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />
      <br />
      <div className="flex">
        Selected Text:{" "}
        {startIndex !== -1 &&
          endIndex !== -1 &&
          text
            .split(" ")
            .slice(startIndex, endIndex + 1)
            .join(" ")}
      </div>
    </div>
  );
};

export default TextSelection;
