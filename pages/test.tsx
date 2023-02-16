import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function test() {
  const supabase = useSupabaseClient();
  const [sentences, setSentences] = useState<[] | null>(null);



  return (
    <div>
     zsg
    </div>
  );
}

export default test;
