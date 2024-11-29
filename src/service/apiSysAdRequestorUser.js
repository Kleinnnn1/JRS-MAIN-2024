import supabase from "./supabase"; // Import supabase client

export async function getRequestors() {
  // Query only users with the userRole "requestor" along with department details
  const { data, error } = await supabase
    .from("User")
    .select(
      `
      idNumber,
      fullName,
      userRole,
      Department (
        deptId,
        deptName
      )
    `
    )
    .eq("userRole", "requestor"); // Filter for requestors only

  if (error) {
    console.error("Error fetching requestors:", error);
    throw error;
  }

  // Format and return the data
  return data.map((user) => ({
    idNumber: user.idNumber,
    fullName: user.fullName,
    deptId: user.Department?.deptId || null, // Handle null Department gracefully
    deptName: user.Department?.deptName || "No Department",
  }));
}
