import React from "react";

type Props = {
  skipped: boolean;
  setSkipped: (skipped: boolean) => void;
  resetHandler: () => void;
  sendData?: () => void;
};

export default function Buttons({
  skipped,
  setSkipped,
  resetHandler,
  sendData,
}: Props) {
  return (
    <div className="w-full flex justify-between text-xs mt-4">
      <button
        className="flex hover:shadow-lg shadow-md items-center bg-gray-100 rounded-full py-2 text-sm px-4"
        onClick={() => {
          setSkipped(!skipped);
        }}
      >
        Skip{" "}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_17_437)">
            <path
              d="M6 18L14.5 12L6 6V18ZM8 9.86L11.03 12L8 14.14V9.86ZM16 6H18V18H16V6Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_437">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>{" "}
      <button
        className="flex hover:shadow-lg shadow-md bg-amber-50 rounded-full text-orange-500 py-2 text-sm px-4"
        onClick={resetHandler}
      >
        Reset{" "}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_17_509)">
            <path
              d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z"
              fill="#CA6F04"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_509">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button
        className="flex hover:shadow-lg shadow-md bg-blue-50 rounded-full text-blue-500 py-2 text-sm px-4"
        onClick={sendData}
      >
        Confirm{" "}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
            fill="#2028F1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
            fill="#2028F1"
          />
        </svg>
      </button>
    </div>
  );
}
