import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getJobAssign() {
  const currentUser = await getCurrentUser();

  // Fetch only relevant fields from the Request table
  const { data, error } = await supabase.from("Request").select(`
    User(fullName),
    description,
    location,
    image,
    dateCompleted,
    priority,
    Department_request_assignment (
      staffName
    )
  `);

  if (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Data could not be loaded");
  }

  // Filter the data where staffName matches currentUser.fullName
  const filteredData = data.filter((item) => {
    const staffNames = item.Department_request_assignment.map(
      (assign) => assign.staffName
    );
    return staffNames.includes(currentUser.fullName);
  });

  console.log("Staff Name: ", currentUser.fullName);
  console.log(filteredData); // Log the filtered data

  return filteredData;
}

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getJobAssign() {
//   const currentUser = await getCurrentUser();

//   const { data, error } = await supabase
//     .from("Request")
//     .select(
//       "User(fullName), description, location, image,  dateCompleted, priority"
//     );

//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }
//   console.log(data);

//   return data;
// }

// import supabase from "./supabase";
// import { getCurrentUser } from "./apiAuth";

// export async function getJobAssign() {
//   const currentUser = await getCurrentUser();

//   const { data, error } = await supabase
//     .from("Request")
//     .select(
//       "requestor, description, location, image,  dateAssign, dateStarted, dateCompleted, priority, staffName"
//     )
//     .eq("staffName", currentUser.fullName);

//   if (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("Data could not be loaded");
//   }

//   return data;
// }
