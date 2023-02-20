import React from "react";

type Props = {
  text: string | null | undefined;
  highlightText: (index: number, word: string) => string;
  handleClick: (index: number) => void;
};

export default function OriginalText({
  text,
  highlightText,
  handleClick,
}: Props) {
  return (
    <div className="text-sm sm:text-xl cursor-pointer">
      {text?.split(" ").map((word, index) => (
        <span
          key={index}
          className={`inline-block p-1 m-1 rounded hover:shadow-lg shadow-sm ${highlightText(
            index,
            word
          )}`}
          onClick={() => handleClick(index)}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
}
