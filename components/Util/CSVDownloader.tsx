import React from "react";

import { useCSVDownloader } from "react-papaparse";

export default function CSVDownloader({ jsonData }) {
  const { CSVDownloader, Type } = useCSVDownloader();

  const filteredData = jsonData.map((jsonData) => {
    return {
      incorrect_text: jsonData.incorrect_text,
      correct_text: jsonData.correct_text,
    };
  });


  return (
    <CSVDownloader
      type={Type.Button}
      filename={Date.now()}
      bom={true}
      data={filteredData}
    >
      Download
    </CSVDownloader>
  );
}
