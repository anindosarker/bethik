import React, { useState } from "react";
import { newTextHandler } from "../Util/newTextHelper";
import { Database } from "../../supabase";
import { StoredCorrections } from "../../typings";

type Props = {
  words: StoredCorrections[];
  originalText: string;
};

function CorrectedText({ words, originalText }: Props) {
  const highlightText = (words: StoredCorrections[], word: string) => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].correctedText === word) {
        return "bg-yellow-200";
      }
    }
    return "";
  };

  const text = newTextHandler(words, originalText).newTextHiglighted;

  return (
    <div className="container flex flex-col space-y-4 p-4 bg-slate-100 rounded-xl mt-10">
      <h2 className="text-3xl">New Text</h2>
      <div className="text-sm text-gray-500">
        Replaced words are highlighted in yellow
      </div>
      <div className="text-xl border border-green-600 p-4 rounded-full bg-green-200">
        {text?.split(" ").map((word: string, index: number) => (
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
