import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadOngoingJobRequest() {
  // Get the current user
  const currentUser = await getCurrentUser();

  // Validate current user
  if (!currentUser || !currentUser.deptId) {
    throw new Error("Invalid user or department");
  }

  // Fetch data directly from the Request table and filter by department and Ongoing status
  const { data, error } = await supabase
    .from("Request")
    .select(
      `requestId,
      description,
      location,
      jobCategory,
      requestDate,
      status,
      priority,
      image,
      User(fullName)`
    )
    .eq("status", "Ongoing"); // Filter by status = 'Ongoing'

  // Handle Supabase query error
  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  if (!data || data.length === 0) {
    throw new Error("No job requests found");
  }

  // Filter and validate data for Ongoing requests
  const filteredData = data.filter(
    (item) =>
      item.User && // Ensure the User relationship exists
      item.status === "Ongoing" // Filter by Ongoing status
  );

  if (filteredData.length === 0) {
    throw new Error("No Ongoing job requests found");
  }

  // Format the filtered data
  const formattedData = filteredData.map((item) => ({
    requestId: item.requestId,
    fullName: item.User?.fullName || "Unknown", // Access nested fullName
    description: item.description || "No description",
    location: item.location || "Unknown location",
    jobCategory: item.jobCategory || "Unspecified",
    requestDate: item.requestDate || "Unknown date",
    status: item.status || "Unknown status",
    priority: item.priority || "No priority",
    image: item.image || "No image",
  }));

  return formattedData;
}

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadOngoingJobRequest() {
//   // Get the current user
//   const currentUser = await getCurrentUser();

//   // Validate current user
//   if (!currentUser || !currentUser.deptId) {
//     throw new Error("Invalid user or department");
//   }

//   // Fetch data with nested relationships and filter by department

//   const { data, error } = await supabase
//     .from("Department_request_assignment")
//     .select(
//       `deptReqAssId,
//   requestId,
//   Request(
//     description,
//     location,
//     jobCategory,
//     requestDate,
//     status,
//     priority,
//     image,
//     User(fullName)
//   )`
//     )
//     .eq("deptId", currentUser.deptId) // Filter by department ID
//     .eq("Request.status", "Ongoing"); // Filter by status = 'Ongoing'

//   // Handle Supabase query error
//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   if (!data || data.length === 0) {
//     throw new Error("No job requests found");
//   }

//   // Filter and validate data for Ongoing requests
//   const filteredData = data.filter(
//     (item) =>
//       item.Request && // Ensure the Request relationship exists
//       item.Request.status === "Ongoing" // Filter by Ongoing status
//   );

//   if (filteredData.length === 0) {
//     throw new Error("No Ongoing job requests found");
//   }

//   // Format the filtered data
//   const formattedData = filteredData.map((item) => ({
//     deptReqAssId: item.deptReqAssId,
//     requestId: item.requestId,
//     fullName: item.Request?.User?.fullName || "Unknown", // Access nested fullName
//     description: item.Request?.description || "No description",
//     location: item.Request?.location || "Unknown location",
//     jobCategory: item.Request?.jobCategory || "Unspecified",
//     requestDate: item.Request?.requestDate || "Unknown date",
//     status: item.Request?.status || "Unknown status",
//     priority: item.Request?.priority || "No priority",
//     image: item.Request?.image || "No priority",
//   }));

//   return formattedData;
// }

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadOngoingJobRequest() {
//   const currentUser = await getCurrentUser();

//   // Fetch requests and join with User table to get the fullName
//   const { data, error } = await supabase
//     .from("Request")
//     .select(
//       `description, location, jobCategory, requestId, idNumber, status, priority, User(fullName)`
//     );

//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   return data;
// }
