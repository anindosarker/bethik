import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState, useEffect } from "react";

type Props = {
  sentenceCount: number;
};

const SentenceCount = () => {
  const supabase = useSupabaseClient();

  const [count, setCount] = useState(0);
  const patha = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`*, sentences(count)`);

      setCount(data[0].sentences[0].count);
      console.log("how many>", count);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // Fetch the count of corrected sentences for the user from your database
    // and update the state using setCount
    patha();
  }, []);

  return (
    <div className="fixed top-0 right-0 bg-white rounded p-2 text-xs text-gray-800 shadow">
      <p className="font-medium">Total Sentences Corrected: {count}</p>
    </div>
  );
};

export default SentenceCount;
