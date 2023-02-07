import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Dualdivs from "./Dualdivs";

const text =
  "আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?আমার দেশের নাম, তুমি কি জানো?";

const TextSelection = () => {
  const [index, setIndex] = useState({ start: 0, end: 0 });

  return (
    <div className="flex flex-col">
      <section className="text-lg max-w-sm">
        {/* Text Display with highlighted selection */}

        {text.slice(0, index.start)}
        <span className="bg-red-500 text-white">
          {text.slice(index.start, index.end)}
        </span>
        {text.slice(index.end)}

        {/* Range Slider */}

        <div className="mt-4 mb-4">
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
      </section>

      {/* DualDivs: Text Display with highlighted selection */}
      <section className="max-w-sm">
        <Dualdivs selectedText={text.slice(index.start, index.end)} />
      </section>

      <div className="flex justify-center">
        <button className="bg-blue-500 rounded-3xl text-white w-1/2 p-2">
          Add another +
        </button>
      </div>
    </div>
  );
};

export default TextSelection;
