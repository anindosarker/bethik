import { useEffect, useState } from "react";

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
      {/* Incorrect */}
      <section className="flex flex-col justify-between items-center w-full">
        <div className="text-xs bg-red-400 font-semibold rounded-t-xl p-2 shadow-md w-full">
          ভুল:{" "}
        </div>
        <div className="relative w-full">
          {selectedText.length ? (
            <div className="bg-red-50 whitespace-pre-wrap rounded-xl rounded-tl-none p-2 text-red-500 shadow-md">
              {selectedText.join(" ")}
            </div>
          ) : (
            <div className="bg-red-50 whitespace-pre-wrap text-xs p-2 rounded-xl rounded-tl-none text-red-500 shadow-md">
              Select words by clicking
            </div>
          )}
        </div>
      </section>

      {/* Correct */}
      <section className="flex flex-col justify-between items-center w-full">
        <div className="text-xs bg-green-400 rounded-t-xl p-2 shadow-md w-full">
          ঠিক টাইপ করুন:{" "}
        </div>
        <div className="relative w-full">
          <input
            type="text"
            className="bg-green-50 border border-gray-300 text-green-900 whitespace-pre-wrap rounded-b-xl p-2 focus:ring-green-500 focus:border-green-500 block w-full "
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center hover:shadow-md p-2 m-1 rounded-full bg-green-200"
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
              <g clipPath="url(#clip0_17_19757)">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                  fill="#00880E"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_19757">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Dualdivs;
