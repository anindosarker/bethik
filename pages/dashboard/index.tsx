import React from "react";
import Sidebar from "../../components/Dash/Sidebar";
import CSVReader from "../../components/Dash/CSVReader";

export default function dashboard() {
  return (
    <div className="grid m-0 grid-cols-6 gap-4 h-screen">
      <div className="row-span-full shadow-lg col-start-1 hidden md:inline">
        <Sidebar />
      </div>
      <div className="container mt-5 row-span-full space-y-4 col-span-full md:col-span-5  px-4">
        <div className="">
          <CSVReader />
        </div>
      </div>
    </div>
  );
}
