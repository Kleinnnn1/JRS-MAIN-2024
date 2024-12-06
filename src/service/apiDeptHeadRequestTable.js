import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadJobRequest() {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    console.log("Current user deptId:", currentUser.deptId);

    // Validate current user
    if (!currentUser || !currentUser.deptId) {
      throw new Error("Invalid user or department");
    }

    // Fetch data directly from the Request table
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
        User(fullName),
        Department_request_assignment!inner(deptId)`
      )
      .eq("status", "Pending") // Filter by status = 'Pending'
      .eq("Department_request_assignment.deptId", currentUser.deptId); // Filter by current user's deptId

    if (error) {
      console.error("Error fetching job requests:", error);
      throw new Error("Data could not be loaded");
    }

    if (!data || data.length === 0) {
      throw new Error("No job requests found");
    }

    // Format the data
    const formattedData = data.map((item) => ({
      requestId: item.requestId,
      fullName: item.User?.fullName || "Unknown", // Access nested fullName
      description: item.description || "No description",
      location: item.location || "Unknown location",
      jobCategory: item.jobCategory || "Unspecified",
      requestDate: item.requestDate || "Unknown date",
      status: item.status || "Unknown status",
      priority: item.priority || "No priority",
      image: item.image || "No image",
      deptId: item.Department_request_assignment[0]?.deptId || "Unknown deptId", // Access deptId from the assignment
    }));

    console.log(formattedData);

    return formattedData;
  } catch (err) {
    console.error("Error in getDeptHeadJobRequest:", err);
    throw err;
  }
}

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
//   // Get the current user
//   const currentUser = await getCurrentUser();

//   // Validate current user
//   if (!currentUser || !currentUser.deptId) {
//     throw new Error("Invalid user or department");
//   }

//   console.log("Current user deptId: ", currentUser.deptId);

//   // Fetch data directly from the Request table and include the deptId from Department_request_assignment
//   const { data, error } = await supabase
//     .from("Request")
//     .select(
//       `requestId,
//       description,
//       location,
//       jobCategory,
//       requestDate,
//       status,
//       priority,
//       image,
//       User(fullName),
//       Department_request_assignment(deptId)`
//     )
//     .eq("status", "Pending"); // Filter by status = 'Pending'

//   // Handle Supabase query error
//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   if (!data || data.length === 0) {
//     throw new Error("No job requests found");
//   }

//   // Filter and validate data for Pending requests
//   const filteredData = data.filter(
//     (item) =>
//       item.User && // Ensure the User relationship exists
//       item.status === "Pending" // Filter by Pending status
//   );

//   // Match the current user's deptId with deptId from Department_request_assignment
//   const filteredAndMatchedData = filteredData.filter((item) =>
//     item.Department_request_assignment.some(
//       (assignment) => assignment.deptId === currentUser.deptId
//     )
//   );

//   if (filteredAndMatchedData.length === 0) {
//     throw new Error("No Pending job requests for the current department found");
//   }

//   // Format the filtered data
//   const formattedData = filteredAndMatchedData.map((item) => ({
//     requestId: item.requestId,
//     fullName: item.User?.fullName || "Unknown", // Access nested fullName
//     description: item.description || "No description",
//     location: item.location || "Unknown location",
//     jobCategory: item.jobCategory || "Unspecified",
//     requestDate: item.requestDate || "Unknown date",
//     status: item.status || "Unknown status",
//     priority: item.priority || "No priority",
//     image: item.image || "No image",
//     deptId: item.Department_request_assignment[0]?.deptId || "Unknown deptId", // Access deptId from the assignment
//   }));

//   console.log(formattedData);

//   return formattedData;
// }

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
//   // Get the current user
//   const currentUser = await getCurrentUser();

//   // Validate current user
//   if (!currentUser || !currentUser.deptId) {
//     throw new Error("Invalid user or department");
//   }

//   // Fetch data directly from the Request table and filter by department and Pending status
//   const { data, error } = await supabase
//     .from("Request")
//     .select(
//       `requestId,
//       description,
//       location,
//       jobCategory,
//       requestDate,
//       status,
//       priority,
//       image,
//       User(fullName)`
//     )
//     .eq("status", "Pending"); // Filter by status = 'Pending'

//   // Handle Supabase query error
//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   if (!data || data.length === 0) {
//     throw new Error("No job requests found");
//   }

//   // Filter and validate data for Pending requests
//   const filteredData = data.filter(
//     (item) =>
//       item.User && // Ensure the User relationship exists
//       item.status === "Pending" // Filter by Pending status
//   );

//   if (filteredData.length === 0) {
//     throw new Error("No Pending job requests found");
//   }

//   // Format the filtered data
//   const formattedData = filteredData.map((item) => ({
//     requestId: item.requestId,
//     fullName: item.User?.fullName || "Unknown", // Access nested fullName
//     description: item.description || "No description",
//     location: item.location || "Unknown location",
//     jobCategory: item.jobCategory || "Unspecified",
//     requestDate: item.requestDate || "Unknown date",
//     status: item.status || "Unknown status",
//     priority: item.priority || "No priority",
//     image: item.image || "No image",
//   }));

//   console.log(data);

//   return formattedData;
// }

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getDeptHeadJobRequest() {
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
//     .eq("Request.status", "Pending"); // Filter by status = 'Pending'

//   // Handle Supabase query error
//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   if (!data || data.length === 0) {
//     throw new Error("No job requests found");
//   }

//   // Filter and validate data for pending requests
//   const filteredData = data.filter(
//     (item) =>
//       item.Request && // Ensure the Request relationship exists
//       item.Request.status === "Pending" // Filter by pending status
//   );

//   if (filteredData.length === 0) {
//     throw new Error("No pending job requests found");
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
