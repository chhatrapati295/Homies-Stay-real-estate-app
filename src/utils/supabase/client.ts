import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
