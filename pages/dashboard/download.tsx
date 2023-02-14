import React from "react";
import Sidebar from "../../components/Dash/Sidebar";
import FileDownloader from "../../components/Util/Filedownloader";

export default function download() {
  return (
    <div className="grid m-auto grid-cols-6 gap-4">
      <div className="container row-span-full">
        <Sidebar />
      </div>
      <div className="container flex flex-col justify-center space-y-4 w-full col-span-5 items-center">
        <h1 className="text-xl">Showing annotated texts only</h1>
        <div>
          <FileDownloader />
        </div>
      </div>
    </div>
  );
}
