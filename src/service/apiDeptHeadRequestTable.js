import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadJobRequest() {
  // Get the current user
  const currentUser = await getCurrentUser();

  // Validate current user
  if (!currentUser || !currentUser.deptId) {
    throw new Error("Invalid user or department");
  }

  // Fetch data with nested relationships and filter by department
  const { data, error } = await supabase
    .from("Department_request_assignment")
    .select(
      `
      deptReqAssId,
      requestId,
      Request(
        description,
        location,
        jobCategory,
        requestDate,
        status,
        priority,
        image,
        User(fullName)
      )
      `
    )
    .eq("deptId", currentUser.deptId); // Filter by department ID

  // Handle Supabase query error
  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  if (!data || data.length === 0) {
    throw new Error("No job requests found");
  }

  // Filter and validate data for pending requests
  const filteredData = data.filter(
    (item) =>
      item.Request && // Ensure the Request relationship exists
      item.Request.status === "Pending" // Filter by pending status
  );

  if (filteredData.length === 0) {
    throw new Error("No pending job requests found");
  }

  // Format the filtered data
  const formattedData = filteredData.map((item) => ({
    deptReqAssId: item.deptReqAssId,
    requestId: item.requestId,
    fullName: item.Request?.User?.fullName || "Unknown", // Access nested fullName
    description: item.Request?.description || "No description",
    location: item.Request?.location || "Unknown location",
    jobCategory: item.Request?.jobCategory || "Unspecified",
    requestDate: item.Request?.requestDate || "Unknown date",
    status: item.Request?.status || "Unknown status",
    priority: item.Request?.priority || "No priority",
    image: item.Request?.image || "No priority",
  }));

  return formattedData;
}

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
//   // Get the current user
//   const currentUser = await getCurrentUser();

//   // Validate current user
//   if (!currentUser) {
//     throw new Error("Invalid user");
//   }

//   // Fetch data with nested relationships
//   const { data, error } = await supabase
//     .from("Department_request_assignment")
//     .select(
//       `
//       deptReqAssId,
//       requestId,
//       Request(
//         description,
//         location,
//         jobCategory,
//         requestDate,
//         status,
//         priority,
//         User(fullName)
//       )
//       `
//     );

//   // Handle Supabase query error
//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   if (!data || data.length === 0) {
//     throw new Error("No job requests found");
//   }

//   // Filter and validate data
//   const filteredData = data.filter(
//     (item) =>
//       item.Request && // Ensure the Request relationship exists
//       item.Request.status === "Pending" // Filter by status
//   );

//   if (filteredData.length === 0) {
//     throw new Error("No pending job requests found");
//   }

//   // Format the filtered data
//   const formattedData = filteredData.map((item) => ({
//     requestId: item.requestId,
//     fullName: item.Request?.User?.fullName || "Unknown", // Access nested fullName
//     description: item.Request?.description || "No description",
//     location: item.Request?.location || "Unknown location",
//     jobCategory: item.Request?.jobCategory || "Unspecified",
//     requestDate: item.Request?.requestDate || "Unknown date",
//     status: item.Request?.status || "Unknown status",
//     priority: item.Request?.priority || "No priority",
//   }));

//   return formattedData;
// }
