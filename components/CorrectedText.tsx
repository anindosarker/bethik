import React, { useState } from "react";

type Props = {
  words: any;
  originalText: string;
};

function CorrectedText({ words, originalText }: Props) {
  const newTextHandler = (words: any) => {
    let newText = originalText;
    words.forEach((word: any) => {
      newText = newText.replace(word.incorrectText, word.correctedText);
    });

    console.log("newText", newText);
    return newText;
  };

  const text = newTextHandler(words);

  return (
    <div>
      <h2 className="text-3xl p-4">New Text: </h2>
      <div className="text-xl border border-green-600 p-4 rounded-full bg-green-200">
        {text}
      </div>
    </div>
  );
}

export default CorrectedText;
