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

  // Prepare the data to insert into the "Request" table
  const requestData = {
    idNumber: currentUser.idNumber,
    location: newRequest.location,
    description: newRequest.description,
    priority: newRequest.priority,
    jobCategory: newRequest.jobCategory,
    image: newRequest.image,
  };

  // Log the request data to verify
  console.log("Request Data to Insert:", requestData);

  // Start a Supabase transaction to insert data into both tables
  const { data, error } = await supabase
    .from("Request")
    .upsert(requestData) // Using upsert for higher-level insertion (insert or update)
    .select(); // Get the data after insertion

  if (error) {
    console.error("Error inserting request:", error);
    throw new Error("Request could not be inserted");
  }

  // Proceed with inserting data into the "Department_request_assignment" table
  // The requestId is returned from the previous insert
  const deptRequestData = {
    requestId: data[0].requestId, // Get requestId from the inserted request
    deptId: newRequest.deptId, // Ensure deptId is provided in newRequest
    staffName: newRequest.staffName, // Ensure staffName is provided
  };

  // Insert into the "Department_request_assignment" table
  const { data: deptData, error: deptError } = await supabase
    .from("Department_request_assignment")
    .upsert(deptRequestData) // Using upsert to ensure the assignment is inserted or updated
    .select(); // Get the inserted assignment data

  if (deptError) {
    console.error("Error inserting department assignment:", deptError);
    throw new Error("Department assignment could not be inserted");
  }

  return {
    request: data, // Return the inserted request data
    departmentAssignment: deptData, // Return the department assignment data
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
