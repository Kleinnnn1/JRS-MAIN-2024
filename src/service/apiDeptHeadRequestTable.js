import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadJobRequest() {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.deptName) {
    throw new Error("Invalid user or department name");
  }

  // Fetch data with optional relationships
  const { data, error } = await supabase
    .from("Department_request_assignment")
    .select(
      `
      requestId,
      User(fullName, deptName),
      Request(description, location, jobCategory, requestDate, status, priority, deptName)
      `
    );

  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  // Filter results in JavaScript
  const filteredData = data.filter(
    (item) =>
      item.Request && // Ensure the Request relationship exists
      item.Request.deptName === currentUser.deptName &&
      item.Request.status === "Pending"
  );

  // Format the filtered data
  const formattedData = filteredData.map((item) => ({
    requestId: item.requestId,
    fullName: item.User?.fullName || null,
    deptName: item.User?.deptName || null,
    description: item.Request?.description || null,
    location: item.Request?.location || null,
    jobCategory: item.Request?.jobCategory || null,
    requestDate: item.Request?.requestDate || null,
    status: item.Request?.status || null,
    priority: item.Request?.priority || null,
  }));

  return formattedData;
}

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
//   const currentUser = await getCurrentUser();

//   if (!currentUser || !currentUser.deptName) {
//     throw new Error("Invalid user or department name");
//   }

//   const { data, error } = await supabase
//     .from("Department_request_assignment")
//     .select(
//       `
//       requestId,
//       User(fullName, deptName),
//       Request(description, location, jobCategory, requestDate, status, priority, deptName)
//       `
//     )
//     .eq("Request.deptName", currentUser.deptName) // Match based on department name
//     .eq("Request.status", "Pending");

//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   // Format the response
//   const formattedData = data.map((item) => ({
//     requestId: item.requestId,
//     fullName: item.User.fullName,
//     deptName: item.User.deptName,
//     description: item.Request.description,
//     location: item.Request.location,
//     jobCategory: item.Request.jobCategory,
//     requestDate: item.Request.requestDate,
//     status: item.Request.status,
//     priority: item.Request.priority,
//   }));

//   return formattedData;
// }

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
//   const currentUser = await getCurrentUser();
//   const { data, error } = await supabase
//     .from("Department_request_assignment")
//     .select(
//       "requestId, idNumber, fullName, description, location, jobCategory, requestDate, deptReqAssId, status, priority"
//     )
//     .eq("deptId", currentUser.deptId)
//     .eq("status", "Pending"); // Only fetch requests with status "Pending"

//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   return data;
// }
