import React from "react";
import Sidebar from "../../components/Dash/Sidebar";
import CSVReader from "../../components/Util/CSVReader";

export default function dashboard() {
  return (
    <div className="grid m-auto grid-cols-6 gap-4">
      <div className="container row-span-full">
        <Sidebar />
      </div>
      <div className="container flex flex-col justify-center space-y-4 w-full col-span-5 items-center">
        <div className="">
          <CSVReader />
        </div>
      </div>
    </div>
  );
}
