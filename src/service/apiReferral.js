import supabase from "./supabase";

export async function getReferral() {
  const { data, error } = await supabase.from("referral").select("*");

  if (error) {
    console.error(error);
    throw new Error("Referral could not be loaded");
  }

  return data;
}

// let { data: referral, error } = await supabase
//   .from('referral')
//   .select('*')
