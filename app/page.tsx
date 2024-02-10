"use client";

import { WordSelectionForm } from "@/components/forms/WordSelectionForm";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/utils/types/database";
import { useEffect, useState } from "react";

export default function Home() {
  const [originalSentence, setOriginalSentence] = useState<
    Database["public"]["Tables"]["sentences"]["Row"][] | null
  >(null);
  const supabase = createClient();
  const getData = async () => {
    const { data } = await supabase.rpc("select_random");
    setOriginalSentence(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {originalSentence && (
        <WordSelectionForm originalData={originalSentence?.[0]} />
      )}
      <pre>{JSON.stringify(originalSentence, null, 2)}</pre>
    </main>
  );
}
