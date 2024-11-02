import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadJobRequest() {
  const currentUser = await getCurrentUser();
  const { data, error } = await supabase
    .from("Request")
    .select(
      "requestor, description, location, jobPosition, requestDate, deptReqAssId, requestId, idNumber"
    )
    .eq("deptId", currentUser.deptId);

  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  return data;
}
