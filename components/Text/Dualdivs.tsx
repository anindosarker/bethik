import { useEffect, useRef, useState } from "react";

type Props = {
  selectedText: string[];
  correctionHandler: Function;
};

function Dualdivs({ selectedText, correctionHandler }: Props) {
  const [inputValue, setInputValue] = useState<string>(selectedText.join(" "));

  useEffect(() => {
    setInputValue(selectedText.join(" "));
  }, [selectedText]);

  return (
    <div className="container flex flex-col  space-y-4">
      <section className="flex justify-between items-center space-x-4">
        {/* Incorrect */}

        {selectedText.length ? (
          <div>
            <div className="text-xs bg-red-200 rounded-t-xl w-fit p-2 shadow-md">
              ভুল:{" "}
            </div>
            <div className="bg-red-50 whitespace-pre-wrap rounded-xl rounded-tl-none p-2 text-red-500 shadow-md">
              {selectedText.join(" ")}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs rounded-xl w-fit p-2">ভুল: </div>
            <div className="text-sm text-gray-500">
              "Select words by clicking"
            </div>
          </div>
        )}
      </section>

      <section className="flex flex-col justify-between items-center w-full">
        {/* Correct */}
        <div className="text-xs bg-green-500 rounded-t-xl p-2 shadow-md w-full">
          ঠিক টাইপ করুন:{" "}
        </div>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
          <input
            type="text"
            className="bg-green-50 border border-gray-300 text-green-900 whitespace-pre-wrap rounded-b-xl p-2 focus:ring-green-500 focus:border-green-500 block w-full pl-10 "
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center p-2 m-1 rounded-full bg-green-200"
            onClick={() => {
              correctionHandler(inputValue, selectedText?.join(" "));
              setInputValue("");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                fill="#00672C"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Dualdivs;
