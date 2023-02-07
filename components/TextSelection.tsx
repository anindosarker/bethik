import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


const text =
  "আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?";

const TextSelection = () => {
  const [index, setIndex] = useState({ start: 0, end: 0 });

  return (
    <div className="flex flex-col max-w-screen-md">
      <div className="text-lg max-w-sm">
        {text.slice(0, index.start)}
        <span className="bg-red-500 text-white">
          {text.slice(index.start, index.end)}
        </span>
        {text.slice(index.end)}
      </div>
      <div className="flex justify-between space-x-4 mt-4">
        <RangeSlider 
          id="range-slider" 
          step={1}
          min={0}
          max={text.length}
          onInput={(e: any) => {
            setIndex({
              start: e[0],
              end: e[1],
            });
          }}
        />
      </div>
      <div className="mt-4 flex space-x-4 max-w-sm">
        <div className="">Incorrect: </div>
        <div className="border border-black whitespace-pre-wrap">
          {text.slice(index.start, index.end)}
        </div>
      </div>
    </div>
  );
};

export default TextSelection;
