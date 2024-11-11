import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export async function getRequestorRequest() {
  const currentUser = await getCurrentUser();
  const { data, error } = await supabase
    .from("Request")
    .select(
      "requestId, description, jobPosition, deptName, image, status, requestDate, dateCompleted, staffName, priority" // Include deptReqAssId here
    )
    .eq("idNumber", currentUser.idNumber); // Match the idNumber from the current user's profile

  if (error) {
    console.error("Error fetching requests:", error);
    throw new Error("Request could not be loaded");
  }
  // console.log(data);

  return data; // Return the fetched data
}

export async function insertRequest(newRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.idNumber) {
    console.error("No current user or idNumber found.");
    throw new Error("User not authenticated or idNumber is missing");
  }

  // Prepare the data to insert
  const requestData = {
    requestor: currentUser.fullName,
    idNumber: currentUser.idNumber, // Add requestor here
    location: newRequest.location,
    description: newRequest.description,
    priority: newRequest.priority, // Ensure priority is included
    jobPosition: newRequest.jobPosition,
    image: newRequest.image,
  };

  // Log the request data to verify
  console.log("Request Data to Insert:", requestData);

  // Insert the request into the "Request" table
  const { data, error } = await supabase.from("Request").insert(requestData);

  if (error) {
    console.error("Error inserting request:", error);
    throw new Error("Request could not be inserted");
  }

  return data; // Return the inserted request data
}
