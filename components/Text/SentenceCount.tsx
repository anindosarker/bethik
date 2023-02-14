import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState, useEffect } from "react";

type Props = {
  sentenceCount: number;
};

const SentenceCount = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [count, setCount] = useState(0);
  const patha = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id);

      if (data) {
        setCount(data[0].edit_count);
      }
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
    <div className="flex flex-col items-center fixed top-20 right-0 gap-4 rounded-lg border border-gray-100 bg-slate-100 shadow-sm shadow-gray-400 p-2">
      <div className="">
        <p className="text-2xl font-medium text-gray-900"> {count}</p>
      </div>
      <p className="text-sm text-gray-500">Total Contributions</p>
    </div>
  );
};

export default SentenceCount;
