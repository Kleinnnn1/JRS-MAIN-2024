import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore"; // Adjust the path as necessary
import supabase from "../service/supabase"; // Adjust this import based on your Supabase setup

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUserMetadata = useUserStore((state) => state.setUserMetadata);

  const { mutate: login } = useMutation({
    mutationFn: async ({ idNumber, email, password }) => {
      console.log("API call initiated");

      // Send the ID number or email, depending on which one is provided
      const result = await loginApi({
        idNumber: idNumber || undefined,
        email: email || undefined,
        password,
      });

      console.log("API call result:", result);
      return result;
    },
    onSuccess: async (data) => {
      console.log("API call successful");

      if (!data?.user) {
        toast.error("Login failed: Invalid user data received.");
        console.error("Login failed: User data is undefined.");
        return;
      }

      // Check if userRole is unverified
      if (data.user.userRole === "unverified") {
        toast.error("Please wait for the account to be verified.");
        console.warn("User role is unverified. Verification pending.");
        return;
      }

      let deptName = "No department"; // Default department name

      // If deptId is present, fetch department name from Supabase
      if (data.user.deptId) {
        const { data: deptData, error } = await supabase
          .from("Department")
          .select("deptName")
          .eq("deptId", data.user.deptId)
          .single();

        if (error) {
          console.error("Error fetching department name:", error);
          toast.error("Error fetching department name.");
        } else {
          deptName = deptData?.deptName || "No department"; // Fallback if deptName is not found
        }
      }

      // Set user data in query client
      queryClient.setQueryData(["user"], data.user);

      // Save user metadata using Zustand, including deptName
      setUserMetadata({
        idNumber: data.user.idNumber,
        role: data.user.userRole,
        fName: data.user.fName,
        lName: data.user.lName,
        userRole: data.user.userRole,
        contactNumber: data.user.contactNumber,
        deptId: data.user.deptId,
        email: data.user.email,
        avatar: data.user.avatar,
        deptName, // Store deptName, whether fetched or default
      });

      // Navigate based on role
      const roleRoutes = {
        "system admin": "/system_admin",
        "department head": "/department_head",
        staff: "/staff",
        requestor: "/requestor",
        "office head": "/office_head",
        spme: "/spme",
      };

      const targetRoute = roleRoutes[data.user.userRole] || "/login";
      navigate(targetRoute, { replace: true });
    },
    onError: (error) => {
      console.log("API call failed");
      console.error("Error details:", error?.response || error);

      // Check for specific error message
      if (
        error.message ===
        "Account verification is pending. Please contact support."
      ) {
        toast.error(
          "Account verification is pending. Please contact your office head."
        );
      } else {
        // Generic error for incorrect credentials
        toast.error("Provided ID number/email or password are incorrect");
      }
    },
  });

  return { login };
}
