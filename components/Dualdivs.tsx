import React from "react";

type Props = {
  selectedText?: string;
};

function Dualdivs({ selectedText }: Props) {
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
        {/* Correct */}
        <div className="">Correct: </div>
        <textarea
          className="w-full border-2 border-green-500 whitespace-pre-wrap rounded-xl px-2"
          defaultValue={selectedText}
        />
      </section>
    </div>
  );
}

export default Dualdivs;
