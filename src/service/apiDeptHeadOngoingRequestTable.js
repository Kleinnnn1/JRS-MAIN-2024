import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadOngoingJobRequest() {
  const currentUser = await getCurrentUser();
  const { data, error } = await supabase
    .from("Request")
    .select(
      "requestor, description, location, jobPosition, requestDate, deptReqAssId, requestId, idNumber, status, priority, staffName"
    )
    .eq("deptId", currentUser.deptId)
    .eq("status", "Ongoing"); // Only fetch requests with status "Ongoing"

  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  return data;
}
