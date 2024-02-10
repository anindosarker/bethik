import React, { FormEvent, useEffect, useState } from "react";
import { StoredCorrections } from "../../typings";

type Props = {
  originalText: string;
};

export default function TestForm({ originalText }: Props) {
  const [input, setInput] = useState(originalText);

  useEffect(() => {
    setInput(originalText);
  }, [originalText]);

  const [formattedText, setFormattedText] = useState("");

  const correctionHandler = (e: FormEvent) => {
    e.preventDefault();

    const words = input.split(" ");
    let currentIndex = 0;
    const corrections: StoredCorrections[] = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const startIndex = input.indexOf(word, currentIndex);
      const endIndex = startIndex + word.length - 1;

      if (word !== originalText.slice(startIndex, endIndex + 1)) {
        const correction = {
          incorrectText: originalText.slice(startIndex, endIndex + 1),
          correctedText: word,
          startIndex,
          endIndex,
        };
        corrections.push(correction);
        words[i] = `$${originalText.slice(startIndex, endIndex + 1)}${
          word.charAt(0).toUpperCase() + word.slice(1)
        }`;
      }

      currentIndex = endIndex + 1;
    }

    setFormattedText(words.join(" "));
    console.log(corrections);
  };

  return (
    <div>
      <form action="" onSubmit={correctionHandler}>
        <label htmlFor="correctInput">⬇️ Input label</label>
        <input
          type="text"
          name="correctInput"
          id="correctInput"
          value={input}
          onChange={(e) => {
            console.log(e.target.value);
            setInput(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <pre>{JSON.stringify(formattedText, null, 2)}</pre>
      </div>
    </div>
  );
}
