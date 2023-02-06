import React, { useState } from "react";

const TextSelection = () => {
  const [text, setText] = useState("Three fruits are: apples, mango, banana.");
  const [index, setIndex] = useState({ start: 0, end: 0 });

  const startIndexHandler = (e) => {
    //check if the start index is less than the end index
    if (e.target.value < index.end) {
      console.log("start index.. ", e.target.value);
      console.log("end index.. ", index.end);

      setIndex({
        ...index,
        start: e.target.value
      });
    }
  };

  //another function for the end index
  const endIndexHandler = (e) => {
    //check if the end index is greater than the start index
    console.log("start index.. ", index.start);
    console.log("end index.. ", e.target.value);

    if (e.target.value > index.start) {
      setIndex({
        ...index,
        end: e.target.value
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-lg">
        {text.slice(0, index.start)}
        <span className="bg-red-500">{text.slice(index.start, index.end)}</span>
        {text.slice(index.end)}
      </div>
      <div className="flex justify-between space-x-4">
        <input
          type="range"
          min={0}
          max={text.length}
          step={1}
          value={index.start}
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
      </div>
    </div>
  );
};

export default TextSelection;
