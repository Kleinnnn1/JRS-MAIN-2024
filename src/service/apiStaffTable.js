import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getJobAssign() {
  const currentUser = await getCurrentUser();

  const { data, error } = await supabase
    .from("Request")
    .select(
      "requestor, description, location, image,  dateAssign, dateStarted, dateCompleted, priority, staffName"
    )
    .eq("staffName", currentUser.fullName);

  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  return data;
}
