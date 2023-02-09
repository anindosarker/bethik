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
            <div className="border-2 border-red-500 whitespace-pre-wrap rounded-xl px-2">
              {selectedText.join(" ")}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              "Select words by clicking"
            </div>
          )}
        </div>

        <button
          className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4"
          onClick={() => {
            resetHandler();
            setInputValue("");
          }}
        >
          {" "}
          Reset
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.33936 4.46777H7.33936V7.02487C8.52937 6.08978 10.03 5.53207 11.6608 5.53207C15.5268 5.53207 18.6608 8.66608 18.6608 12.5321C18.6608 16.3981 15.5268 19.5321 11.6608 19.5321C9.51031 19.5321 7.58632 18.5623 6.30225 17.0363L7.92157 15.8515C8.83747 16.8825 10.1733 17.5321 11.6608 17.5321C14.4222 17.5321 16.6608 15.2935 16.6608 12.5321C16.6608 9.77065 14.4222 7.53207 11.6608 7.53207C10.574 7.53207 9.56811 7.87884 8.74785 8.46777L11.3394 8.46777V10.4678H5.33936V4.46777Z"
              fill="#FF2E00"
            />
          </svg>
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
          className="flex items-center bg-green-50 rounded-full text-green-800 py-2 text-sm px-4"
          onClick={() => {
            correctionHandler(inputValue, selectedText?.join(" "));
            setInputValue("");
          }}
        >
          Save
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
              fill="#00672C"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
              fill="#00672C"
            />
          </svg>
        </button>
      </section>
    </div>
  );
}

export default Dualdivs;
