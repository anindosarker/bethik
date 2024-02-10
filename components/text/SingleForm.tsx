import React, { FormEvent, useEffect, useState } from "react";
import { StoredCorrections } from "../../typings";

type Props = {
  originalText: string;
};

export default function SingleForm({ originalText }: Props) {
  const [input, setInput] = useState(originalText);

  useEffect(() => {
    setInput(originalText);
  }, [originalText]);

  const [formattedText, setFormattedText] = useState("");

  const correctionHandler = (e: FormEvent) => {
    e.preventDefault();

    const originalText = "Expression & Text to?see matches.";
    const inputText = "Expression & Text to see matches.";

    // Split the original and input text into an array of words and punctuation marks
    const originalWords = originalText.match(/[\w']+|[^\w\s]/g) || [];
    const inputWords = inputText.match(/[\w']+|[^\w\s]/g) || [];

    // Map over the original words to create the formatted output
    const formattedOutput = originalWords.map((originalWord, index) => {
      const inputWord = inputWords[index] ?? "";
      const isPunctuation = !/[\w']/.test(originalWord);

      // Return the original word if the input word matches
      if (originalWord === inputWord) {
        return originalWord;
      }

      // Return the formatted word if the input word doesn't match
      const suggestion = inputWord ? `${inputWord}` : "";
      return isPunctuation
        ? `${originalWord}${suggestion}`
        : `$${originalWord}${suggestion}${suggestion ? " " : ""}${suggestion}${
            originalWord.endsWith(" ") ? " " : ""
          }`;
    });

    setFormattedText(formattedOutput.join(""));

    console.log(formattedText);
  };

  return (
    <div>
      <form
        action=""
        onSubmit={correctionHandler}
        className="flex flex-col space-y-4"
      >
        <label
          htmlFor="correctInput"
          className="block text-sm font-medium text-blue-700"
        >
          ⬇️ Input label
        </label>
        <input
          type="text"
          name="correctInput"
          id="correctInput"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
          value={input}
          onChange={(e) => {
            console.log(e.target.value);
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      <div className="mt-4">
        <pre>{JSON.stringify(formattedText, null, 2)}</pre>
      </div>
    </div>
  );
}
