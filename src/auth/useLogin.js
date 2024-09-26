import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore"; // Adjust the path as necessary

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUserMetadata = useUserStore((state) => state.setUserMetadata);

  const { mutate: login } = useMutation({
    mutationFn: async ({ idNumber, password }) => {
      console.log("API call initiated");
      const result = await loginApi({ idNumber, password });
      console.log("API call result:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("API call successful");

      // Set user data in query client
      queryClient.setQueryData(["user"], data.user);

      // Save user metadata using Zustand
      setUserMetadata({
        idNumber: data.user.idNumber,
        role: data.user.userRole,
        fName: data.user.fName,
        lName: data.user.lName,
        userRole: data.user.userRole,
        contactNumber: data.user.contactNumber,
        deptId: data.user.deptId,
        jobId: data.user.jobId,
        email: data.user.email,
        avatar: data.user.avatar,
      });

      // Navigate based on role
      if (data.user.userRole === "system admin") {
        navigate("/system_admin", { replace: true });
      } else if (data.user.userRole === "department head") {
        navigate("/department_head", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    },
    onError: (error) => {
      console.log("API call failed");
      console.error("Error details:", error); // Log the error details for debugging
      toast.error("Provided ID number or password are incorrect");
    },
  });

  return { login };
}
