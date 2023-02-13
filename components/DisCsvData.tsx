import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";

export default function DisCsvData({ csvData }: any) {
  const dataArray = Array.from(csvData);

   const supabase = useSupabaseClient();

   const inserReq = async (datacsv) => {
     const chunkSize = 500;

     const chunks = [];
     let chunk = [];
     for (let i = 0; i < datacsv.length; i++) {
       chunk.push(datacsv[i]);
       if (chunk.length === chunkSize || i === datacsv.length - 1) {
         chunks.push(chunk);
         chunk = [];
       }
     }

     for (let i = 0; i < chunks.length; i++) {
       try {
         const { data, error } = await supabase
           .from("sentences")
           .insert(chunks[i]);
         if (error) {
           throw error;
         }
       } catch (error) {
         console.error(error);
       }
     }
   };

  return (
    <div>
      <div>
        {dataArray.map((sentence, index) => (
          <div key={index} className="text-red-500">
            {sentence[0]}
          </div>
        ))}
      </div>

      <button
        className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4"
        onClick={() => {
          inserReq(csvData);
        }}
      >
        Insert{" "}
      </button>
    </div>
  );
}
