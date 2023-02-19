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
    <div className="container flex flex-col  space-y-4">
      <section className="flex justify-between items-center space-x-4">
        {/* Incorrect */}

        <div className="">
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
        </div>

        <button
          className="flex items-center hover:shadow-lg shadow-md bg-red-100 rounded-full text-red-500 py-2 text-sm px-4"
          onClick={() => {
            resetHandler();
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
            <g clipPath="url(#clip0_17_1174)">
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#FF0202"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_1174">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </section>

      <section className="flex justify-between items-center space-x-4">
        {/* Correct */}
        <div className="w-1/2">
          <div className="text-xs bg-green-500 rounded-t-xl w-fit p-2 shadow-md">
            ঠিক টাইপ করুন:{" "}
          </div>
          <input
            className="border border-green-500 bg-green-50 text-green-900 whitespace-pre-wrap rounded-xl rounded-tl-none p-2 shadow-md"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>

        <button
          className="flex items-center hover:shadow-lg shadow-md bg-green-200 rounded-full text-green-800 py-2 text-sm px-4"
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
      </section>
    </div>
  );
}

export default Dualdivs;
