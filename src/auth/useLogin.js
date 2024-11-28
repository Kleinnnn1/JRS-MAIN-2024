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
    onSuccess: (data) => {
      console.log("API call successful");

      if (!data?.user) {
        toast.error("Login failed: Invalid user data received.");
        console.error("Login failed: User data is undefined.");
        return;
      }

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
        email: data.user.email,
        avatar: data.user.avatar,
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
      console.error("Error details:", error?.response || error); // Improved error logging
      toast.error("Provided ID number/email or password are incorrect");
    },
  });

  return { login };
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../service/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import useUserStore from "../store/useUserStore"; // Adjust the path as necessary

// export function useLogin() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const setUserMetadata = useUserStore((state) => state.setUserMetadata);

//   const { mutate: login } = useMutation({
//     mutationFn: async ({ idNumber, password }) => {
//       console.log("API call initiated");
//       const result = await loginApi({ idNumber, password });
//       console.log("API call result:", result);
//       return result;
//     },
//     onSuccess: (data) => {
//       console.log("API call successful");

//       if (!data?.user) {
//         toast.error("Login failed: Invalid user data received.");
//         console.error("Login failed: User data is undefined.");
//         return;
//       }

//       // Set user data in query client
//       queryClient.setQueryData(["user"], data.user);

//       // Save user metadata using Zustand
//       setUserMetadata({
//         idNumber: data.user.idNumber,
//         role: data.user.userRole,
//         fName: data.user.fName,
//         lName: data.user.lName,
//         userRole: data.user.userRole,
//         contactNumber: data.user.contactNumber,
//         deptId: data.user.deptId,
//         email: data.user.email,
//         avatar: data.user.avatar,
//       });

//       // Navigate based on role
//       const roleRoutes = {
//         "system admin": "/system_admin",
//         "department head": "/department_head",
//         staff: "/staff",
//         requestor: "/requestor",
//       };

//       const targetRoute = roleRoutes[data.user.userRole] || "/login";
//       navigate(targetRoute, { replace: true });
//     },
//     onError: (error) => {
//       console.log("API call failed");
//       console.error("Error details:", error?.response || error); // Improved error logging
//       toast.error("Provided ID number or password are incorrect");
//     },
//   });

//   return { login };
// }
