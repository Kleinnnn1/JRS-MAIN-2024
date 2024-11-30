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

export async function insertDepartment(newDepartment) {
  // Validate the input
  if (!newDepartment || !newDepartment.deptName) {
    throw new Error("Invalid department data. 'deptName' is required.");
  }

  // Prepare the data to insert
  const departmentData = {
    deptName: newDepartment.deptName,
  };

  // Check if a department with the same name (case-insensitive) already exists
  const { data: existingDepartments, error: checkError } = await supabase
    .from("Department")
    .select("deptName")
    .ilike("deptName", newDepartment.deptName); // Case-insensitive comparison

  // Handle errors while checking for existing department
  if (checkError) {
    console.error("Error checking existing department:", checkError);
    throw new Error("Could not check if department exists");
  }

  // If a department already exists (any result), throw an error
  if (existingDepartments && existingDepartments.length > 0) {
    throw new Error(
      `Department with the name '${newDepartment.deptName}' already exists.`
    );
  }

  // Insert the department into the Department table
  const { data, error } = await supabase
    .from("Department")
    .insert(departmentData);

  // Handle errors while inserting the department
  if (error) {
    console.error("Error inserting department:", error);
    throw new Error("Department could not be inserted");
  }

  // Return the inserted data
  return data;
}

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
