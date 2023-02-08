import React, { useState } from "react";
import Dualdivs from "./Dualdivs";
import { start } from "repl";

const text =
  "আমার দেশের নাম, তুমি কি জানো?২০১৪ সালের ৫ই জানুয়ারির আগ পর্যন্ত তাই ছিল অঘোষিত নিয়ম।";

function TextSelection() {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<
    | {
        start: number;
        end: number;
      }
    | undefined
  >(undefined);

  const [storedCorrections, setStoredCorrections] = useState<
    {
      incorrectText: string;
      correctedText: string;
      start: number;
      end: number;
    }[]
  >([]);

  const handleClick = (index: number) => {
    if (
      storedCorrections.some(
        (correction) => correction.start <= index && correction.end >= index
      )
    ) {
      return;
    }

    let start = selectedRange?.start;
    let end = selectedRange?.end;
    if (start === undefined || end === undefined) {
      start = index;
      end = index;
    } else {
      end = index;
      if (start > end) {
        const temp = start;
        start = end;
        end = temp;
      }
    }
    setSelectedRange({
      start: start,
      end: end,
    });
    setSelectedWords(text.split(" ").slice(start, end + 1));
  };

  const correctionHandler = (submittedText: any, incText: any) => {
    if (selectedRange) {
      setStoredCorrections((prevSelectedRange) => {
        return [
          ...prevSelectedRange,
          {
            incorrectText: incText,
            correctedText: submittedText,
            start: selectedRange?.start,
            end: selectedRange?.end,
          },
        ];
      });
      divReset();
    }

    console.log("storedCorrection", storedCorrections);

    //generate new text with corrections
    let newText = text.split(" ");
    storedCorrections.forEach((correction) => {
      newText.splice(
        correction.start,
        correction.end - correction.start + 1,
        correction.correctedText
      );
    });

    console.log("newText", newText.join(" "));
  };

  const divReset = () => {
    setSelectedRange(undefined);
    setSelectedWords([]);
  };

  return (
    <div>
      {/* Display Original Text */}
      <div>
        {text.split(" ").map((word, index) => (
          <span key={index} onClick={() => handleClick(index)}>
            {word}{" "}
          </span>
        ))}
      </div>

      {/* Display clicked words */}
      <div>
        <Dualdivs
          selectedText={selectedWords}
          correctionHandler={correctionHandler}
          resetHandler={divReset}
        />
      </div>
    </div>
  );
}

export default TextSelection;
