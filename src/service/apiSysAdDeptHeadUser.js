import supabase from "./supabase";

export async function getDepartmentHeads() {
  const { data, error } = await supabase
    .from("Department")
    .select(
      `
        deptName,
        User (
          fullName,
          userRole,
          created_at
        )
      `
    )
    .in("User.userRole", ["department head", "office head"]); // Filter for multiple roles

  if (error) {
    console.error("Error fetching department heads:", error);
    throw new Error("Failed to fetch department heads.");
  }

  return data.map((department) => ({
    deptName: department.deptName,
    heads: department.User.filter(
      (user) => user.userRole === "department head" || "office head"
    ).map((user) => ({
      fullName: user.fullName,
      createdAt: user.created_at,
    })),
  }));
}
