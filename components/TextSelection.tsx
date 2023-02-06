import React, { useState, useRef } from "react";

const TextSelection = () => {
  const [selectedText, setSelectedText] = useState("");
  const textRef = useRef(null);

  const handleSelection = () => {
    if (textRef.current) {
      const selected = window.getSelection().toString();
      setSelectedText(selected);
    }
  };

  return (
    <div>
      <div ref={textRef} onMouseUp={handleSelection}>
        আমার দেশের নাম, তুমি কি জানো?
      </div>
      <br />
      <br />
      Selected Text: {selectedText}
    </div>
  );
};

export default TextSelection;
