import React, { useState } from "react";

const dataPrompt = "আমার দেশের নাম, তুমি কি জানো?";

const TextSelection = () => {
  const [text, setText] = useState(dataPrompt);
  const [index, setIndex] = useState({ start: 0, end: 0 });

  const startIndexHandler = (e) => {
    //check if the start index is less than the end index
    if (e.target.value < index.end) {
      setIndex({
        ...index,
        start: e.target.value,
      });
    }
  };

  //another function for the end index
  const endIndexHandler = (e) => {
    if (e.target.value < index.start) {
      setIndex({
        end: index.start,
        start: e.target.value,
      });
    } else {
      setIndex({
        ...index,
        end: e.target.value,
      });
    }
  };


  
  return (
    <div className="flex flex-col">
      <div className="text-lg">
        {text.slice(0, index.start)}
        <span className="bg-red-500 text-white">
          {text.slice(index.start, index.end)}
        </span>
        {text.slice(index.end)}
      </div>
      <div className="flex justify-between space-x-4 mt-4">
        Start
        <input
          type="range"
          min={0}
          max={text.length}
          step={1}
          value={index.start}
          className=""
          onChange={startIndexHandler}
        />
        <input
          type="range"
          min={0}
          max={text.length}
          step={1}
          value={index.end}
          onChange={endIndexHandler}
        />
        End
      </div>
    </div>
  );
};

export default TextSelection;
