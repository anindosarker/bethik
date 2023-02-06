import React, { useState } from "react";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";

const text = "আমার দেশের নাম, তুমি কি জানো?";

const TextSelection = () => {
  const [selectedText, setSelectedText] = useState(text);
  const [index, setIndex] = useState({ start: 0, end: 0 });

  const startIndexHandler = (e) => {
    console.log("start index...", index.start);
    console.log("end index...", index.end);
    console.log("event ...", e.target.value);

    //check if the start index is less than the end index
    if (e.target.value < index.end) {
      setIndex({
        ...index,
        start: e.target.value,
      });
    }
    setSelectedText(text.slice(e.target.value, index.end));
  };

  //another function for the end index
  const endIndexHandler = (e) => {
    console.log("start index...", index.start);
    console.log("end index...", index.end);
    console.log("event ...", e.target.value);

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

    setSelectedText(text.slice(index.start, e.target.value));
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
        <MultiRangeSlider
          min={0}
          max={text.length}
          onChange={({ min, max }) => {
            setIndex({ start: min, end: max });
          }}
        />
      </div>
      <div className="mt-4 flex space-x-4">
        <div className="">Incorrect: </div>
        <div className="border border-black whitespace-pre	">
          {text.slice(index.start, index.end)}
        </div>
      </div>
    </div>
  );
};

export default TextSelection;
