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
  const regex = /(\w+|[^\s\W])/g;
  return (
    <div className="text-sm sm:text-xl cursor-pointer">
      {text?.split(regex).map((word, index) => (
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

      <pre>{JSON.stringify(text)}</pre>
      split
      <pre>{JSON.stringify(text)?.split(regex)}</pre>
      <pre>
        {JSON.stringify(text?.split(regex).filter((word) => word !== ""))}
      </pre>
    </div>
  );
}
