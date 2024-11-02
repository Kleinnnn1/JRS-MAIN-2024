import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";
import { useAssignmentStore } from "../store/useAssignmentStore"; // Adjust the import path accordingly

export async function insertStaff(newStaff) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.idNumber) {
    console.error("No current user or idNumber found.");
    throw new Error("User not authenticated or idNumber is missing");
  }

  const { deptReqAssId, requestId, idNumber } = useAssignmentStore.getState(); // Retrieve deptReqAssId and requestId from the store

  // Prepare staff data for updating
  const staffData = {
    staffName: newStaff.staffName, // Staff name to be updated
    requestId: requestId, // Request ID to be updated
    idNumber: idNumber,
  };

  // Update the staff record
  console.log(
    "Attempting to update staff record with deptReqAssId:",
    deptReqAssId,
    "and updating requestId:",
    requestId,
    "and updating idNUmber:",
    idNumber
  );

  const { data, error } = await supabase
    .from("Department_request_assignment")
    .update(staffData)
    .match({ deptReqAssId }); // Match the existing deptReqAssId

  // Handle errors
  if (error) {
    console.error("Error updating staff:", error.message);
    throw new Error("Failed to update staff record.");
  }

  // Optionally return the updated data
  return data;
}

// import { getCurrentUser } from "./apiAuth";
// import supabase from "./supabase";
// import { useAssignmentStore } from "../store/useAssignmentStore"; // Adjust the import path accordingly

// export async function insertStaff(newStaff) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser || !currentUser.idNumber) {
//     console.error("No current user or idNumber found.");
//     throw new Error("User not authenticated or idNumber is missing");
//   }

//   const { deptReqAssId } = useAssignmentStore.getState(); // Retrieve reqAssId from the store

//   // Prepare staff data for updating
//   const staffData = {
//     staffName: newStaff.staffName, // Staff name to be updated
//   };

//   // Update the staff record
//   console.log(
//     "Attempting to update staff record with deptReqAssId:",
//     deptReqAssId
//   );
//   const { data, error } = await supabase
//     .from("Department_request_assignment")
//     .update(staffData)
//     .match({ deptReqAssId }); // Match the existing deptReqAssId

//   // Handle errors
//   if (error) {
//     console.error("Error updating staff:", error.message);
//     throw new Error("Failed to update staff record.");
//   }

//   // Optionally return the updated data
//   return data;
// }

// import { getCurrentUser } from "./apiAuth";
// import supabase from "./supabase";

// export async function insertStaff(newStaff) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser || !currentUser.idNumber) {
//     console.error("No current user or idNumber found.");
//     throw new Error("User not authenticated or idNumber is missing");
//   }

//   const staffData = { staffName: newStaff.staffName };

//   console.log("staffName:", staffData);

//   const { data, error } = await supabase
//     .from("Department_request_assignment")
//     .update({
//       staffName: staffData,
//     })
//     .match({ id: "your_record_id" }); // Specify the condition to match the record you want to update
// }
