import React, { useState } from "react";
import { Database } from "../../supabase";
import { StoredCorrections } from "../../typings";
import useTextOutput from "../hooks/useTextOutput";

type Props = {
  words: StoredCorrections[];
  originalText: string;
};

function CorrectedText({ words, originalText }: Props) {
  const highlightText = (words: StoredCorrections[], word: string) => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].correctedText === word) {
        return "bg-green-100 p-1 px-2 rounded ";
      }
    }
    return "";
  };

  const text = useTextOutput(words, originalText).newTextHighlighted;
  const textOutput = useTextOutput(words, originalText).newText;

  return (
    <div className="container flex flex-col space-y-4 p-4 mt-10">
      <div className="text-xs text-gray-500">
        Replaced words are highlighted
      </div>
      <div className="font-semibold text-green-600 rounded-full ">
        {text?.split(" ").map((word: string, index: number) => (
          <span
            key={index}
            className={`inline-block m-2 ${highlightText(words, word)}`}
          >
            {word}{" "}
          </span>
        ))}
      </div>
      <div className="font-semibold text-green-600 rounded-full ">
        {textOutput?.split(" ").map((word: string, index: number) => (
          <span
            key={index}
            className={`inline-block m-2 ${highlightText(words, word)}`}
          >
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CorrectedText;
