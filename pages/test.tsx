import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function test() {
  const supabase = useSupabaseClient();
  const [sentences, setSentences] = useState<[] | null>(null);

  const [senCount, setSenCount] = useState<number>(0);

  const patha = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`*, sentences(count)`);

      setSenCount(data[0].sentences[0].count)
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center px-10">
      <h1 className="my-10">patha</h1>

      <button
        className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4"
        onClick={patha}
      >
        Send req{" "}
      </button>
    </div>
  );
}

export default test;
