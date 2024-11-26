import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";
import { useAssignmentStore } from "../store/useAssignmentStore"; // Adjust the import path accordingly

export async function insertStaff(newStaff, totalRowsToInsert) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.idNumber) {
    console.error("No current user or idNumber found.");
    throw new Error("User not authenticated or idNumber is missing");
  }

  const { deptReqAssId, requestId, idNumber } = useAssignmentStore.getState(); // Retrieve deptReqAssId and requestId from the store

  const staffName = newStaff.staffName; // Staff name for updating the first row

  try {
    // Step 1: Check if the row with deptReqAssId exists
    const { data: existingRows, error: fetchError } = await supabase
      .from("Department_request_assignment")
      .select("*")
      .eq("deptReqAssId", deptReqAssId);

    if (fetchError) {
      console.error("Error fetching existing rows:", fetchError.message);
      throw new Error("Failed to fetch existing rows.");
    }

    if (!existingRows || existingRows.length === 0) {
      console.error("No existing rows found for the given deptReqAssId.");
      throw new Error("No rows found to update or insert.");
    }

    // Step 2: Update the first row (Only once, not part of the loop)
    const { error: updateError } = await supabase
      .from("Department_request_assignment")
      .update({ staffName }) // Update the first row with the provided staffName
      .match({ deptReqAssId });

    if (updateError) {
      console.error(
        "Error updating the first staff record:",
        updateError.message
      );
      throw new Error("Failed to update the first staff record.");
    }

    console.log(
      `Successfully updated record with deptReqAssId: ${deptReqAssId}`
    );

    // Step 3: Insert only one additional row with the correct deptReqAssId
    const insertValues = [];
    if (totalRowsToInsert > 0) {
      const newDeptReqAssId = deptReqAssId + 1; // Only insert the next deptReqAssId

      // Check if the new deptReqAssId exists
      const { data: existingInsertRows, error: checkError } = await supabase
        .from("Department_request_assignment")
        .select("*")
        .eq("deptReqAssId", newDeptReqAssId);

      if (checkError) {
        console.error(
          "Error checking for existing deptReqAssId:",
          checkError.message
        );
        throw new Error("Failed to check existing deptReqAssId.");
      }

      if (existingInsertRows.length === 0) {
        // Check if staffName is already in the same deptReqAssId, if so, skip the insert
        const { data: existingStaffRows, error: staffCheckError } =
          await supabase
            .from("Department_request_assignment")
            .select("*")
            .eq("staffName", staffName) // Check if staffName already exists
            .eq("requestId", requestId); // You can also check by requestId to ensure it's not duplicated

        if (staffCheckError) {
          console.error(
            "Error checking for existing staff:",
            staffCheckError.message
          );
          throw new Error("Failed to check existing staff.");
        }

        if (existingStaffRows.length === 0) {
          // Insert only if staffName does not exist for the same requestId
          insertValues.push({
            created_at: new Date().toISOString(),
            requestId,
            deptId: 1,
            staffName: staffName, // Only insert if it's not duplicated
          });
        } else {
          console.log(
            `Staff with name ${staffName} already exists. Skipping insert.`
          );
        }
      } else {
        console.log(`DeptReqAssId ${newDeptReqAssId} already exists.`);
      }
    }

    // Step 4: Insert new rows if there are any
    if (insertValues.length > 0) {
      const { data: insertData, error: insertError } = await supabase
        .from("Department_request_assignment")
        .insert(insertValues);

      if (insertError) {
        console.error(
          "Error inserting additional staff records:",
          insertError.message
        );
        throw new Error("Failed to insert additional staff records.");
      }

      console.log(
        `${insertValues.length} additional staff records inserted successfully.`,
        insertData
      );
    } else {
      console.log("No new rows to insert as deptReqAssId already exists.");
    }
  } catch (error) {
    console.error("Error in insertStaff function:", error.message);
    throw new Error("Failed to perform staff operations.");
  }
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

//   const { deptReqAssId, requestId, idNumber } = useAssignmentStore.getState(); // Retrieve deptReqAssId and requestId from the store

//   // Prepare staff data for updating
//   const staffData = {
//     staffName: newStaff.staffName, // Staff name to be updated
//     requestId: requestId, // Request ID to be updated
//     idNumber: idNumber,
//   };

//   // Update the staff record
//   console.log(
//     "Attempting to update staff record with deptReqAssId:",
//     deptReqAssId,
//     "and updating requestId:",
//     requestId,
//     "and updating idNUmber:",
//     idNumber
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
