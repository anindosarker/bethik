import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TableCheckbox from '../components/Dash/TableCheckbox';

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
    <div>
      <TableCheckbox />
    </div>


  );
}

export default test;
