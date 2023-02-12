import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function FileDownloader() {
  const supabase = useSupabaseClient();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    async function downloadFile() {
      try {
        const { data, error } = await supabase.storage
          .from("public/csvfiles")
          .download("files/small.csv");
        if (error) {
          throw error;
        }
          const fileReader = new FileReader();
          fileReader.readAsText(data, "UTF-8");
          fileReader.onload = (event) => {
            const contents = event.target?.result;
            setFileData(contents);
          };
      } catch (error) {
        console.error("Error downloading file: ", error);
      }
    }

    downloadFile();
  }, [supabase]);

  useEffect(() => {
    if (fileData) {
      console.log("File data: ", fileData);
    }
  }, [fileData]);

  return (
    <div>
      {fileData ? (
        <pre>{fileData}</pre>
      ) : (
        <div>Downloading file...</div>
      )}
    </div>
  );
}

export default FileDownloader;
