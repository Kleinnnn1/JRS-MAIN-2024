import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export async function getRequestorRequest() {
  const currentUser = await getCurrentUser();
  const { data, error } = await supabase
    .from("Request")
    .select("*") // Select all columns
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

  // Fetch the latest deptReqAssId
  const { data: deptReqAssData, error: deptReqAssError } = await supabase
    .from("Department_request_assignment")
    .select("deptReqAssId")
    .order("deptReqAssId", { ascending: false })
    .limit(1);

  if (deptReqAssError) {
    console.error("Error fetching latest deptReqAssId:", deptReqAssError);
    throw new Error("Failed to fetch the latest deptReqAssId");
  }

  const latestDeptReqAssId = deptReqAssData[0]?.deptReqAssId || null;

  if (!latestDeptReqAssId) {
    console.error("No existing deptReqAssId found.");
    throw new Error("Cannot proceed without a valid deptReqAssId");
  }

  const newDeptReqAssId = latestDeptReqAssId + 1;
  console.log(
    "Latest deptReqAssId:",
    latestDeptReqAssId,
    "New deptReqAssId:",
    newDeptReqAssId
  );

  // Insert into the Request table
  const requestData = {
    idNumber: currentUser.idNumber,
    location: newRequest.location,
    description: newRequest.description,
    priority: newRequest.priority,
    jobCategory: newRequest.jobCategory,
    image: newRequest.image,
  };

  const { data: requestInsertData, error: requestInsertError } = await supabase
    .from("Request")
    .insert(requestData)
    .select();

  if (requestInsertError) {
    console.error("Error inserting request:", requestInsertError);
    throw new Error("Request could not be inserted");
  }

  const newRequestId = requestInsertData[0]?.requestId;

  if (!newRequestId) {
    console.error("Failed to retrieve new requestId after insert.");
    throw new Error("Request insert did not return a valid requestId");
  }

  // Insert into Department_request_assignment
  if (!newRequestId || !newDeptReqAssId) {
    console.error("Invalid data for Department_request_assignment:", {
      newRequestId,
      newDeptReqAssId,
    });
    throw new Error(
      "Missing required fields for Department_request_assignment"
    );
  }

  const deptReqAssignData = {
    deptReqAssId: newDeptReqAssId,
    requestId: newRequestId,
  };

  console.log(
    "Prepared data for Department_request_assignment:",
    deptReqAssignData
  );

  const { data: deptAssignInsertData, error: deptAssignInsertError } =
    await supabase
      .from("Department_request_assignment")
      .insert(deptReqAssignData)
      .select();

  if (deptAssignInsertError) {
    console.error(
      "Error inserting into Department_request_assignment:",
      deptAssignInsertError
    );
    throw new Error("Failed to insert into Department_request_assignment");
  }

  console.log("Successfully inserted request and department assignment:", {
    request: requestInsertData,
    assignment: deptAssignInsertData,
    insertedDeptReqAssId: newDeptReqAssId,
  });

  return {
    request: requestInsertData,
    assignment: deptAssignInsertData,
    insertedDeptReqAssId: newDeptReqAssId,
  };
}

// export async function insertRequest(newRequest) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser || !currentUser.idNumber) {
//     console.error("No current user or idNumber found.");
//     throw new Error("User not authenticated or idNumber is missing");
//   }

//   // Prepare the data to insert
//   const requestData = {
//     idNumber: currentUser.idNumber, // Add requestor here
//     location: newRequest.location,
//     description: newRequest.description,
//     priority: newRequest.priority, // Ensure priority is included
//     jobCategory: newRequest.jobCategory,
//     image: newRequest.image,
//   };

//   // Log the request data to verify
//   console.log("Request Data to Insert:", requestData);

//   // Insert the request into the "Request" table
//   const { data, error } = await supabase.from("Request").insert(requestData);

//   if (error) {
//     console.error("Error inserting request:", error);
//     throw new Error("Request could not be inserted");
//   }

//   return data; // Return the inserted request data
// }

// import { getCurrentUser } from "./apiAuth";
// import supabase from "./supabase";

// export async function getRequestorRequest() {
//   const currentUser = await getCurrentUser();
//   const { data, error } = await supabase
//     .from("Request")
//     .select("*") // Select all columns
//     .eq("idNumber", currentUser.idNumber); // Match the idNumber from the current user's profile

//   if (error) {
//     console.error("Error fetching requests:", error);
//     throw new Error("Request could not be loaded");
//   }
//   // console.log(data);

//   return data; // Return the fetched data
// }

// export async function insertRequest(newRequest) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser || !currentUser.idNumber) {
//     console.error("No current user or idNumber found.");
//     throw new Error("User not authenticated or idNumber is missing");
//   }

//   // Prepare the data to insert
//   const requestData = {
//     idNumber: currentUser.idNumber, // Add requestor here
//     location: newRequest.location,
//     description: newRequest.description,
//     priority: newRequest.priority, // Ensure priority is included
//     jobCategory: newRequest.jobCategory,
//     image: newRequest.image,
//   };

//   // Log the request data to verify
//   console.log("Request Data to Insert:", requestData);

//   // Insert the request into the "Request" table
//   const { data, error } = await supabase.from("Request").insert(requestData);

//   if (error) {
//     console.error("Error inserting request:", error);
//     throw new Error("Request could not be inserted");
//   }

//   return data; // Return the inserted request data
// }
