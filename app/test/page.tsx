import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("sentences").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
