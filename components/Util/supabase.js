import { createClient } from "@supabase/supabase-js";
import { Database } from "../../supabase";

const supabaseUrl = "https://fjhwnfzhoyyooawuomln.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  createClient <
  Database >
  (supabaseUrl,
  supabaseKey,
  {
    preferSupabaseJs: true,
  });

export default supabase;
