import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function getTest() {
  const { data, error } = await supabase.from("test_table").select("*");

  if (error) {
    console.log(error);
    throw new Error("Test data could not be loaded");
  }
  return data;
}
