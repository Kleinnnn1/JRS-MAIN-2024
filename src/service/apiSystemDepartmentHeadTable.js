import supabase from "./supabase"; // Import supabase client
import { getCurrentUser } from "./apiAuth"; // Adjust the path to your getCurrentUser function

export async function getDepartments() {
  const { data, error } = await supabase.from("Department").select(
    `
        deptId,
        deptName,
        User (
          fullName,
          userRole
        )
      `
  );

  if (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }

  // Process data to map the department heads (can have multiple)
  return data.map((department) => {
    const departmentHeads = department.User?.filter(
      (user) =>
        user.userRole === "department head" || user.userRole === "office head"
    ).map((user) => user.fullName);

    return {
      deptId: department.deptId,
      deptName: department.deptName,
      deptHead:
        departmentHeads?.length > 0
          ? departmentHeads.join(", ")
          : "No Head Assigned",
    };
  });
}

// Insert Department
export async function insertDepartment(newDepartment) {
  // Validate the input
  if (!newDepartment || !newDepartment.deptName) {
    throw new Error("Invalid department data. 'deptName' is required.");
  }

  // Prepare the data to insert
  const departmentData = {
    deptName: newDepartment.deptName,
  };

  // Insert the department into the Department table
  const { data, error } = await supabase
    .from("Department")
    .insert(departmentData);

  // Handle errors
  if (error) {
    console.error("Error inserting department:", error);
    throw new Error("Department could not be inserted");
  }

  // Return the inserted data
  return data;
}

// import supabase from "./supabase"; // Import supabase client
// import { getCurrentUser } from "./apiAuth"; // Adjust the path to your getCurrentUser function

// // Fetch Departments
// export async function getDepartments() {
//   // Get the current user's information
//   const currentUser = await getCurrentUser();

//   // Ensure currentUser and userRole are available
//   if (!currentUser || !currentUser.userRole) {
//     throw new Error(
//       "User role not found. Please ensure the user is logged in."
//     );
//   }

//   // Fetch departments based on the user's role
//   const { data, error } = await supabase.from("Department").select("*");

//   // Handle errors
//   if (error) {
//     console.error("Error fetching departments:", error);
//     throw error;
//   }

//   // Return the data
//   return data;
// }

// // Insert Department
// export async function insertDepartment(newDepartment) {
//   // Validate the input
//   if (!newDepartment || !newDepartment.deptName) {
//     throw new Error("Invalid department data. 'deptName' is required.");
//   }

//   // Prepare the data to insert
//   const departmentData = {
//     deptName: newDepartment.deptName,
//   };

//   // Insert the department into the Department table
//   const { data, error } = await supabase
//     .from("Department")
//     .insert(departmentData);

//   // Handle errors
//   if (error) {
//     console.error("Error inserting department:", error);
//     throw new Error("Department could not be inserted");
//   }

//   // Return the inserted data
//   return data;
// }
