import { React, useRef } from "react";

type Props = {
  selectedText?: string[];
  correctionHandler: Function;
  resetHandler: Function;
};

function Dualdivs({ selectedText, correctionHandler, resetHandler }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
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
          ref={inputRef}
          className="border-2 border-blue-500 whitespace-pre-wrap rounded-xl px-2"
          defaultValue={selectedText?.join(" ")}
        />
      </section>

      <button
        className="bg-green-500 rounded-3xl text-white h-20 w-40 p-4 m-4"
        onClick={() => {
          correctionHandler(inputRef.current?.value, selectedText?.join(" "));
          inputRef.current!.value = "";
        }}
      >
        Correct Kor
      </button>
      <button
        className="bg-red-500 rounded-3xl text-white h-20 w-40 p-4 m-4"
        onClick={() => {
         resetHandler();
         inputRef.current!.value = "";
        }}
      >
        Reset Selection
      </button>
    </div>
  );
}

export default Dualdivs;
