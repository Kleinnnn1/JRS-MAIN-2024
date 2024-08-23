import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

//fetch row data in supabase

export async function getReferral() {
  const { data, error } = await supabase.from("referral").select("*");

  if (error) {
    console.error(error);
    throw new Error("Referral could not be loaded");
  }

  return data;
}

//insert data through form handler in supabase

export async function insertReferral(referralData) {
  const imageName = `${Math.random()}-${referralData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/referral-images/${imageName}`;
  // https://hnhwwcqwlcbcvbvryzxu.supabase.co/storage/v1/object/public/referral-images/Img%201.png

  //1. create referral
  const { data, error } = await supabase
    .from("referral")
    .insert([{ ...referralData, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Referral could not be deleted");
  }
  //2. upload image
  return data;
}

//delete a row in data in supabase
export async function deleteReferral(referral_id) {
  // Use referral_id instead of id
  const { error } = await supabase
    .from("referral")
    .delete()
    .eq("referral_id", referral_id);

  if (error) {
    console.error(error);
    throw new Error("Referral could not be deleted");
  }
}
