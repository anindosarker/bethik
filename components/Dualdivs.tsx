import { useEffect, useRef, useState } from "react";

type Props = {
  selectedText: string[];
  correctionHandler: Function;
  resetHandler: Function;
};

function Dualdivs({ selectedText, correctionHandler, resetHandler }: Props) {
  const [inputValue, setInputValue] = useState<string>(selectedText.join(" "));

  useEffect(() => {
    setInputValue(selectedText.join(" "));
  }, [selectedText]);

  return (
    <div className="flex flex-col w-full">
      <section>
        {/* Incorrect */}
        <div className="">Incorrect: </div>
        <div className="border-2 border-red-500 whitespace-pre-wrap rounded-xl px-2">
          {selectedText}
        </div>
      </section>

      <section>
        {/* Incorrect */}
        <div className="">Correct: </div>
        <input
          className="border-2 border-blue-500 whitespace-pre-wrap rounded-xl px-2"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </section>

      <button
        className="bg-green-500 rounded-3xl text-white h-20 w-40 p-4 m-4"
        onClick={() => {
          correctionHandler(inputValue, selectedText?.join(" "));
          setInputValue("");
        }}
      >
        Correct Kor
      </button>
      <button
        className="bg-red-500 rounded-3xl text-white h-20 w-40 p-4 m-4"
        onClick={() => {
          resetHandler();
          setInputValue("");
        }}
      >
        Reset Selection
      </button>
    </div>
  );
}

export default Dualdivs;
