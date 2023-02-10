import React from "react";

interface WordProps {
  word: string;
  index: number;
  highlightText: (index: number, word: string) => string;
  handleClick: (index: number) => void;
}

const Word = (props: WordProps) => {
  return (
    <span
      key={props.index}
      className={`inline-block p-2 m-2 rounded ${props.highlightText(
        props.index,
        props.word
      )}`}
      onClick={() => props.handleClick(props.index)}
    >
      {props.word}{" "}
    </span>
  );
};

export default Word;
