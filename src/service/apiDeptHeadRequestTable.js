import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadJobRequest() {
  const currentUser = await getCurrentUser();
  const { data, error } = await supabase
    .from("Request")
    .select(
      "requestor, description, location, jobPosition, requestDate, deptReqAssId, requestId, idNumber, status, priority"
    )
    .eq("deptId", currentUser.deptId)
    .eq("status", "Pending"); // Only fetch requests with status "Pending"

  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  return data;
}

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
//   const currentUser = await getCurrentUser();
//   const { data, error } = await supabase
//     .from("Request")
//     .select(
//       "requestor, description, location, jobPosition, requestDate, deptReqAssId, requestId, idNumber, status"
//     )
//     .eq("deptId", currentUser.deptId);

//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   return data;
// }
