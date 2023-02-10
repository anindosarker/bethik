import React from "react";
import Dualdivs from "./Dualdivs";

interface HighlightedTextProps {
  selectedText: string[];
  correctionHandler: (submittedText: string, incText: string) => void;
  resetHandler: () => void;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  selectedText,
  correctionHandler,
  resetHandler,
}) => {
  return (
    <div className="container mt-4">
      <Dualdivs
        selectedText={selectedText}
        correctionHandler={correctionHandler}
        resetHandler={resetHandler}
      />
    </div>
  );
};

export default HighlightedText;
