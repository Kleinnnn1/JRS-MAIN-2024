import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hnhwwcqwlcbcvbvryzxu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuaHd3Y3F3bGNiY3ZidnJ5enh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2Njg1NzMsImV4cCI6MjAzNTI0NDU3M30.maYvTklRhmitbHy0lNvH5L0ePG0C1mknO2QOfYOIeCg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
