import React from "react";
import Sidebar from "../../components/Dash/Sidebar";
import FileDownloader from "../../components/Util/Filedownloader";

export default function download() {
  return (
    <div className="grid m-auto grid-cols-6 gap-4">
      <div className="row-span-full col-start-1 shadow-lg ">
        <Sidebar />
      </div>
      <div className="container col-start-2 flex mt-5 flex-col justify-center space-y-4 col-span-5 items-center">
        <h1 className="text-xl">Showing annotated texts only</h1>
        <FileDownloader />
        <div></div>
      </div>
    </div>
  );
}
