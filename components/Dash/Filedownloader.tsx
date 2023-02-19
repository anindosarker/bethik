import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CSVDownloader from "./CSVDownloader";
import { SentenceType } from "../../typings";
import TableCheckbox from "./TableCheckbox";

type Props = {
  startDate: string;
  endDate: string;
};

function FileDownloader({ startDate, endDate }: Props) {
  const supabase = useSupabaseClient();
  const [sentences, setSentences] = useState<SentenceType[] | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data, error } = await supabase
          .from("sentences")
          .select("*")
          // .eq("is_checked", true)
          // .gte("created_at", startDate)
          // .lte("created_at", endDate);
        setSentences(data);
        console.log("sentences", data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAll();
  }, []);

  return (
    <div>
      {!sentences ? (
        <div>loading...</div>
      ) : sentences.length === 0 ? (
        <div className="text-center text-xl font-semibold">
          Sorry, No data found
        </div>
      ) : (
        <div className="space-y-4">
          <div className="max-w-fit space-x-4 flex items-center border-2 border-blue-500 px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-500 hover:text-white">
            <CSVDownloader jsonData={sentences} />
          </div>

          <h1 className="text-xl font-semibold px-2">
            Total {sentences.length} rows
          </h1>
          <TableCheckbox tableData={sentences} />
        </div>
      )}
    </div>
  );
}

export default FileDownloader;
