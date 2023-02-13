import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function FileDownloader() {
  const supabase = useSupabaseClient();
  const [sentences, setSentences] = useState<[] | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data, error } = await supabase.from("sentences").select("*");
        setSentences(data as []);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAll();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(sentences, null, 2)}</pre>
    </div>
  );
}

export default FileDownloader;
