import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Dualdivs from "./Dualdivs";
import CorrectedText from "./CorrectedText";

const text =
  "আমার দেশের নাম, তুমি কি জানো? ২০১৪ সালের ৫ই জানুয়ারির আগ পর্যন্ত তাই ছিল অঘোষিত নিয়ম। মুসলমানরা তিনটি প্রদেশে সংখ্যাগরিষ্ঠ হলেও সামগ্রিকভাবে ভারতে তারা সংখ্যালঘু।";

const TextSelection = () => {
  const [index, setIndex] = useState({ start: 0, end: 0, slicedText: "" });
  const [divRender, setDivRender] = useState([index]);

  const addDualDivsHandler = () => {
    if (index.start === index.end) {
      alert("Please select a text");
      return;
    }
    setDivRender([...divRender, index]);
  };

  const removeDualDivHandler = (removeIndex: number) => {
    const updatedDivRender = divRender.filter(
      (item, index) => index !== removeIndex + 1
    );

    setDivRender(updatedDivRender);
    console.log(updatedDivRender);
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

      {/* Render divs if the text is selected */}

      <section className="max-w-sm">
        {divRender.slice(1).map((item, index) => {
          return (
            <div className="flex bg-slate-200 rounded-2xl p-4 my-2" key={index}>
              <Dualdivs selectedText={item.slicedText} />
              <div className="flex flex-col px-4 justify-center">
                <button
                  className="bg-red-500 rounded-3xl text-white h-10 w-20 p-2"
                  onClick={() => removeDualDivHandler(index)}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex justify-center">
        <button
          className="bg-blue-500 rounded-3xl text-white w-1/2 p-2"
          onClick={addDualDivsHandler}
        >
          Add selection
        </button>
      </div>

      <CorrectedText text={text} indexArray={divRender} />
    </div>
  );
};

export default TextSelection;
