import React, { useState } from "react";
import Dualdivs from "./Dualdivs";
import { start } from "repl";
import CorrectedText from "./CorrectedText";

const text =
  "আমার দেশের নাম, তুমি কি জানো?২০১৪ সা লের ৫ই জানু য়ারি র আগ পর্ যন্ত  তাই ছিল অঘোষিত নিয়ম।";

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

    newTextHandler(storedCorrections);
  };

  const newTextHandler = (words: any) => {
    let newText = text;
    words.forEach((word: any) => {
      newText = newText.replace(word.incorrectText, word.correctedText);
    });

    console.log("newText", newText);
    return newText;
  };

  const divReset = () => {
    setSelectedRange(undefined);
    setSelectedWords([]);
  };

  const highlightText = (index: number, word: string) => {
    if (
      storedCorrections.some(
        (correction) => correction.start <= index && correction.end >= index
      )
    ) {
      return "bg-green-500 text-white";
    } else if (selectedWords.includes(word)) {
      return "bg-red-500 text-white";
    } else {
      return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Display Original Text */}
      <div className="text-xl ">
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
      {/* Display clicked words */}
      <div>
        <Dualdivs
          selectedText={selectedWords}
          correctionHandler={correctionHandler}
          resetHandler={divReset}
        />
      </div>
      <CorrectedText words={storedCorrections} originalText={text} />
    </div>
  );
}

export default TextSelection;
