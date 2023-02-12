import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function FileUploader() {
  const supabase = useSupabaseClient();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  
  const handleUpload: React.ChangeEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error("Select a file");
      }
      const fileName = file.name;
      const filePath = `files/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("public/csvfiles")
        .upload(filePath, file, {upsert: true });

      if (uploadError) {
        throw uploadError;
      }
      console.log("File uploaded: ", filePath);
    } catch (error) {
      console.error("Error uploading file: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4"
        onClick={handleUpload}
      >
        upload
      </button>
    </div>
  );
}

export default FileUploader;
