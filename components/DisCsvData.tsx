import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";

export default function DisCsvData({ csvData }: any) {
  const dataArray = Array.from(csvData);
  

  return (
    <div>
      <div>
        {dataArray.map((sentence, index) => (
          <div key={index} className="text-red-500">
            {sentence[0]}
          </div>
        ))}
      </div>
    </div>
  );
}
