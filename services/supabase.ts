import { createClient } from "@supabase/supabase-js";

// Use the NEXT_PUBLIC_ prefix so the browser can see it
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables",
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
);

export default supabase;
