import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Fetch all referrals
export async function getReferral() {
  const { data, error } = await supabase.from("referral").select("*");

  if (error) {
    console.error(error);
    throw new Error("Referral could not be loaded");
  }

  return data;
}

// Fetch a single referral by ID
export async function getReferralById(referralId) {
  const { data, error } = await supabase
    .from("referral")
    .select("*")
    .eq("referral_id", referralId)
    .single(); // Use single() to get one record

  if (error) {
    console.error(error);
    throw new Error("Referral could not be loaded");
  }

  return data;
}

// Insert a new referral
export async function insertReferral(newReferral) {
  const imageName = `${Math.random()}-${newReferral.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/referral-images/${imageName}`;
  // 1. Create

  const { data, error } = await supabase
    .from("referral")
    .insert({ ...newReferral, image: imagePath });

  if (error) {
    throw new Error("Referral cannot be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("referral-images")
    .upload(imageName, newReferral.image);

  // 3. Delete the image file if there was an error in uploading image
  if (storageError) {
    await supabase
      .from("referral")
      .delete()
      .eq("referral_id", data.referral_id);
    console.error(storageError);
    throw new Error("Referral image cannot be uploaded");
  }

  return data;
}

// Delete a referral
export async function deleteReferral(referral_id) {
  const { error } = await supabase
    .from("referral")
    .delete()
    .eq("referral_id", referral_id);

  if (error) {
    console.error(error);
    throw new Error("Referral could not be deleted");
  }
}

export async function updateReferral(referral_id, updatedData) {
  let imagePath = updatedData.image;

  // Check if a new image is being uploaded (assuming updatedData.image is a File object if new)
  if (updatedData.image && typeof updatedData.image !== "string") {
    // Generate a unique name for the image
    const imageName = `${Math.random()}-${updatedData.image.name}`.replaceAll(
      "/",
      ""
    );

    // Define the image path in Supabase Storage
    imagePath = `${supabaseUrl}/storage/v1/object/public/referral-images/${imageName}`;

    // Upload the new image to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("referral-images")
      .upload(imageName, updatedData.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Referral image could not be uploaded");
    }
  }

  // Proceed with updating the referral record
  const { data, error } = await supabase
    .from("referral")
    .update({ ...updatedData, image: imagePath }) // Update with the correct image path
    .eq("referral_id", referral_id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Referral could not be updated");
  }

  return data;
}

// const { data, error } = await supabase
//   .from('referral')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()
