import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CSVDownloader from "./CSVDownloader";
import { SentenceType } from "../../typings";

function FileDownloader() {
  const supabase = useSupabaseClient();
  const [sentences, setSentences] = useState<SentenceType[] | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data, error } = await supabase
          .from("sentences")
          .select("*")
          .eq("is_checked", true);
        setSentences(data);
        console.log("sentences data", data);
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
      ) : (
        <div>
          <div className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4 max-w-min">
            <CSVDownloader jsonData={sentences} />
          </div>

          <h1>Total {sentences.length} rows</h1>

          {sentences.map((sentence: SentenceType) => {
            return (
              <div
                className="flex-col p-2 border rounded-xl border-teal-500 my-4"
                key={sentence?.id}
              >
                <p className="bg-red-100 rounded-full px-4">
                  {sentence?.incorrect_text}
                </p>
                <p className="bg-green-100 rounded-full px-4">
                  {sentence?.correct_text}
                </p>
              </div>
            );
          })}

          <pre>{JSON.stringify(sentences, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileDownloader;
