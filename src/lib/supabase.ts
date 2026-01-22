import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;

// Use SERVICE_ROLE_KEY on the server to bypass RLS for actions.
// On the client, this will fallback to ANON_KEY as SERVICE_ROLE_KEY is not exposed to the browser.
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !import.meta.env.SUPABASE_ANON_KEY) {
	console.error("Missing Supabase environment variables. Comments will not work.");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");
