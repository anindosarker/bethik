import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import adf from "./Dualdivs";
import Dualdivs from "./Dualdivs";
import { timeStamp } from "console";

const text =
  "আমার দেশের নাম, তুমি কি জানো? ২০১৪ সালের ৫ই জানুয়ারির আগ পর্যন্ত তাই ছিল অঘোষিত নিয়ম। মুসলমানরা তিনটি প্রদেশে সংখ্যাগরিষ্ঠ হলেও সামগ্রিকভাবে ভারতে তারা সংখ্যালঘু।";

const TextSelection = () => {
  const [index, setIndex] = useState({ start: 0, end: 0, slicedText: "" });
  const [divRender, setDivRender] = useState([index]);

  const addDualDivsHandler = () => {
    setDivRender([...divRender, index]);
  };

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
                slicedText: text.slice(index.start, index.end),
              });
            }}
          />
        </div>
      </section>

      <section className="max-w-sm">
        {
          // do not render for the first time, skip the first instance.
          divRender.slice(1).map((item, index) => {
            return (
              <div key={index}>
                <Dualdivs selectedText={item.slicedText} />
              </div>
            );
          })
        }
      </section>

      <div className="flex justify-center">
        <button
          className="bg-blue-500 rounded-3xl text-white w-1/2 p-2"
          onClick={addDualDivsHandler}
        >
          Add selection
        </button>
      </div>
    </div>
  );
};

export default TextSelection;
