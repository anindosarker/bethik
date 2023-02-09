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
    <div className="flex flex-col w-full space-y-4">
      <section className="flex justify-between items-center space-x-4">
        {/* Incorrect */}
        <div className="">Incorrect: </div>

        <div className="text-sm">
          {selectedText.length ? (
            <div
              className="border-2 border-red-500 whitespace-pre-wrap rounded-xl px-2"
            >
              {selectedText.join(" ")}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              "Select words by clicking"
            </div>
          )}
        </div>

        <button
          className="bg-red-500 rounded-full text-white p-2 text-sm"
          onClick={() => {
            resetHandler();
            setInputValue("");
          }}
        >
          Reset Selection
        </button>
      </section>

      <section className="flex justify-between items-center space-x-4">
        {/* Correct */}
        <div className="">Correct: </div>
        <input
          className="border-2 border-blue-500 whitespace-pre-wrap rounded-xl px-2"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="bg-green-500 rounded-full text-white p-2 text-sm"
          onClick={() => {
            correctionHandler(inputValue, selectedText?.join(" "));
            setInputValue("");
          }}
        >
          Correct Kor
        </button>
      </section>
    </div>
  );
}

export default Dualdivs;
