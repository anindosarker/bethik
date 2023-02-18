import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-screen bg-white border-r sticky top-2 left-0">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1 overflow-clip">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z"
                fill="black"
              />
              <path
                d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                fill="black"
              />
            </svg>

            <span className="ml-3 text-sm font-medium"> Upload </span>
          </Link>
          <Link
            href="/dashboard/download"
            className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                fill="black"
              />
              <path
                d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                fill="black"
              />
            </svg>

            <span className="ml-3 text-sm font-medium"> Download </span>
          </Link>
          <Link
            href="/dashboard/leaderboard"
            className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

            <span className="ml-3 text-sm font-medium"> Leaderboard </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
