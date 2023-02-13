import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function FileDownloader() {
  const supabase = useSupabaseClient();
  const [sentences, setSentences] = useState<[] | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data, error } = await supabase.from('sentences').select('*');
        setSentences(data as []);
        console.log("data", data);
        
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
      ):(
        sentences.map((sentence) => {
          return (
            <div className="space-y-4 flex-col" key={sentence.id}>
              <p className="bg-red-100 rounded-full px-4 my-4">
                {sentence.incorrect_text}
              </p>
              <p className="bg-green-100 rounded-full px-4">
                {sentence.correct_text}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FileDownloader;
