import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export async function getDeptHeadNotification() {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    console.log("Current user deptId:", currentUser.deptId);

    // Validate current user
    if (!currentUser || !currentUser.deptId) {
      throw new Error("Invalid user or department");
    }

    // Fetch data directly from the Notification table
    const { data, error } = await supabase
      .from("Notification")
      .select(`
        notificationid,
        message,
        timestamp,
        Request (
          requestId,
          description,
          location,
          jobCategory,
          requestDate,
          priority,
          remarks,
          image,
          idNumber,
          User (fullName)
        )
      `)
      .eq("idNumber", currentUser.idNumber);

    if (error) {
      console.error("Error fetching Notifications:", error);
      throw new Error("Data could not be loaded");
    }

    if (!data || data.length === 0) {
      throw new Error("No Notifications found");
    }

    // Format data to include the full name of the requestor and other fields
    const formattedData = data.map((item) => ({
      notificationid: item.notificationid,
      message: item.message || "No message provided",
      timestamp: item.timestamp || "No timestamp available",
      fullName: item.Request?.User?.fullName || "Unknown user", // Fetch the full name of the associated requestor
      requestId: item.Request?.requestId || "Unknown requestId",
      description: item.Request?.description,
      location: item.Request?.location,
      jobCategory: item.Request?.jobCategory,
      requestDate: item.Request?.requestDate,
      priority: item.Request?.priority,
      remarks: item.Request?.remarks,
      image: item.Request?.image,
      idNumber: item.Request?.idNumber,
    }));

    console.log(formattedData);

    return formattedData;
  } catch (err) {
    console.error("Error in getDeptHeadNotification:", err);
    throw err;
  }
}
