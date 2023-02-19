import React from "react";
import { useCSVDownloader } from "react-papaparse";
import { SentenceType } from "../../typings";

type Props = {
  jsonData: SentenceType[] | undefined;
};

export default function CSVDownloader({ jsonData }: Props) {
  const { CSVDownloader, Type } = useCSVDownloader();

  const filteredData = jsonData?.map((jsonData) => {
    return {
      incorrect_text: jsonData?.incorrect_text,
      correct_text: jsonData?.correct_text,
    };
  });

  return (
    <CSVDownloader
      type={Type.Button}
      filename={new Date(Date.now()).toLocaleString()}
      bom={true}
      data={filteredData}
    >
      <div className="max-w-fit font-semibold space-x-4 flex items-center border-2 border-blue-500 px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-500 hover:text-white">

      Download CSV
      </div>
    </CSVDownloader>
  );
}
