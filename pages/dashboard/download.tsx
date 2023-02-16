import React, { useState } from "react";
import Sidebar from "../../components/Dash/Sidebar";
import FileDownloader from "../../components/Dash/Filedownloader";

export default function download() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // Add this line

  return (
    <div className="grid m-0 grid-cols-6 gap-4">
      <div className="row-span-full shadow-lg col-start-1 hidden md:inline">
        <Sidebar />
      </div>
      <div className="container mt-5 row-span-full space-y-4 col-span-full md:col-span-5  px-4">
        {dataLoaded ? (
          <FileDownloader startDate={start} endDate={end} />
        ) : (
          <div>
            <h1>Select Dates</h1>

            <div className="flex items-center">
                <input
                  name="start"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date start"
                  onChange={(e) => {
                    setStart(e.target.value);
                  }}
                />
                <span className="mx-4 text-gray-500">to</span>
                <input
                  name="end"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date end"
                  onChange={(e) => {
                    setEnd(e.target.value);
                  }}
                />
            </div>

                <button
                  className="flex items-center mt-10 bg-blue-50 rounded-full text-blue-500 py-2 text-sm px-4"
                  onClick={() => {
                    start && end ? setDataLoaded(true) : setDataLoaded(false);
                  }}
                >
                  Get the data{" "}
                </button>
          </div>
        )}
      </div>
    </div>
  );
}
