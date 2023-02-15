import React from "react";
import Sidebar from "../../components/Dash/Sidebar";
import CSVReader from "../../components/Util/CSVReader";

export default function dashboard() {
  return (
    <div className="grid m-0 grid-cols-6 gap-4 h-screen">
      <div className="row-span-full shadow-lg fixed">
        <Sidebar />
      </div>
      <div className="container col-start-2 flex flex-col justify-center space-y-4 col-span-5 items-center">
        <div className="">
          <CSVReader />
        </div>
      </div>
    </div>
  );
}
