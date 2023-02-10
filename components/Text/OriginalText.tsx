import React from "react";
import Word from "./Word";

interface OriginalTextProps {
  text: string;
  highlightText: (index: number, word: string) => string;
  handleClick: (index: number) => void;
}

const OriginalText = (props: OriginalTextProps) => {
  return (
    <div className="text-xl">
      {props.text.split(" ").map((word, index) => (
        <Word
          key={index}
          word={word}
          index={index}
          highlightText={props.highlightText}
          handleClick={props.handleClick}
        />
      ))}
    </div>
  );
};

export default OriginalText;
