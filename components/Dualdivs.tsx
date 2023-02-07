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
        <div className="border-2 border-red-500 whitespace-pre-wrap rounded-xl">
          {selectedText}
        </div>
      </section>

      <section>
        {/* Correct */}
        <div className="">Correct: </div>
        <textarea
          className="w-full border-2 border-green-500 whitespace-pre-wrap rounded-xl"
          defaultValue={selectedText}
        />
      </section>
    </div>
  );
}

export default Dualdivs;
