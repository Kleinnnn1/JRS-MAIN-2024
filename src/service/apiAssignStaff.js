import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";
import { useAssignmentStore } from "../store/useAssignmentStore"; // Adjust the import path accordingly

export async function insertStaff(assignments) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.idNumber || !currentUser.deptId) {
    console.error("No current user, idNumber, or deptId found.");
    throw new Error(
      "User not authenticated or required user information is missing"
    );
  }

  const { deptReqAssId, requestId } = useAssignmentStore.getState(); // Retrieve deptReqAssId and requestId from the store

  try {
    // Step 1: Update the first row with the first assignment
    const firstAssignment = assignments[0];
    const { error: updateError } = await supabase
      .from("Department_request_assignment")
      .update({ staffName: firstAssignment.staffName }) // Update the first row with the staff name
      .match({ requestId });

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

    // Step 2: Update the Request table's status to 'Ongoing'
    const { error: updateStatusError } = await supabase
      .from("Request")
      .update({ status: "Ongoing" }) // Set status to 'Ongoing'
      .eq("requestId", requestId); // Match by requestId

    if (updateStatusError) {
      console.error(
        "Error updating the status of the request:",
        updateStatusError.message
      );
      throw new Error("Failed to update the request status.");
    }

    console.log(
      `Successfully updated status to 'Ongoing' for requestId: ${requestId}`
    );

    // Step 3: Query the database for the max deptReqAssId
    const { data: maxDeptReqAssIdData, error: maxDeptReqAssIdError } =
      await supabase
        .from("Department_request_assignment")
        .select("deptReqAssId")
        .order("deptReqAssId", { ascending: false })
        .limit(1);

    if (maxDeptReqAssIdError) {
      console.error(
        "Error fetching max deptReqAssId:",
        maxDeptReqAssIdError.message
      );
      throw new Error("Failed to fetch max deptReqAssId.");
    }

    // Increment deptReqAssId for new rows
    const nextDeptReqAssId =
      maxDeptReqAssIdData?.[0]?.deptReqAssId + 1 || deptReqAssId + 1;

    // Step 4: Insert the remaining rows
    const insertValues = assignments.slice(1).map((assignment, index) => {
      return {
        created_at: new Date().toISOString(),
        requestId,
        deptId: currentUser.deptId, // Use currentUser.deptId dynamically
        staffName: assignment.staffName,
        deptReqAssId: nextDeptReqAssId + index, // Increment deptReqAssId
      };
    });

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
    }
  } catch (error) {
    console.error("Error in insertStaff function:", error.message);
    throw new Error("Failed to perform staff operations.");
  }
}
