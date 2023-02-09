import React from "react";
import Sidebar from "../components/Sidebar";

export default function dashboard() {
  return (
    <div className="flex justify-between">
      <Sidebar/>
      <div>Content</div>
    </div>
  );
}
