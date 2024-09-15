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
    mutationFn: async ({ idnumber, password }) => {
      console.log("API call initiated");
      const result = await loginApi({ idnumber, password });
      console.log("API call result:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("API call successful");

      // Set user data in query client
      queryClient.setQueryData(["user"], data.user);

      // Save user metadata using Zustand
      setUserMetadata({
        idnumber: data.user.idnumber,
        role: data.user.userrole,
        fname: data.user.fname,
        lname: data.user.lname,
        userrole: data.user.userrole,
        contactnumber: data.user.contactnumber,
        departmentid: data.user.departmentid,
        jobid: data.user.jobid,
        email: data.user.email,
        avatar: data.user.avatar,
      });

      // Navigate based on role
      if (data.user.userrole === "system admin") {
        navigate("/system_admin", { replace: true });
      } else if (data.user.userrole === "department head") {
        navigate("/department_head", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    },
    onError: () => {
      console.log("API call failed");
      toast.error("Provided ID number or password are incorrect");
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
//     mutationFn: async ({ idnumber, password }) => {
//       console.log("API call initiated"); // Log when API call is initiated
//       const result = await loginApi({ idnumber, password });
//       console.log("API call result:", result); // Log the result of the API call
//       return result;
//     },
//     onSuccess: (data) => {
//       console.log("API call successful"); // Log when API call is successful
//       console.log("Success data:", data); // Log the data returned from the API

//       // Set user data in query client
//       queryClient.setQueryData(["user"], data.user);

//       // Save user metadata using Zustand
//       setUserMetadata({
//         idnumber: data.user.idnumber,
//         role: data.user.userrole,
//         // Add other metadata as needed
//       });

//       // Navigate based on role
//       if (data.user.userrole === "system admin") {
//         navigate("/system_admin", { replace: true });
//       } else if (data.user.userrole === "department head") {
//         navigate("/department_head", { replace: true });
//       } else {
//         navigate("/login", { replace: true }); // Redirect to a default or home route
//       }
//     },
//     onError: () => {
//       console.log("API call failed"); // Log when API call fails
//       toast.error("Provided ID number or password are incorrect");
//     },
//   });

//   return { login };
// }

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
//     mutationFn: ({ idnumber, password }) => loginApi({ idnumber, password }),
//     onSuccess: (data) => {
//       // Set user data in query client
//       queryClient.setQueryData(["user"], data.user);

//       // Save user metadata using Zustand
//       setUserMetadata({
//         idnumber: data.user.idnumber,
//         role: data.user.userrole,
//         // Add other metadata as needed
//       });

//       // Navigate based on role
//       if (data.user.userrole === "system admin") {
//         navigate("/system_admin", { replace: true });
//       } else if (data.user.userrole === "department head") {
//         navigate("/department_head", { replace: true });
//       } else {
//         navigate("/login", { replace: true }); // Redirect to a default or home route
//       }
//     },
//     onError: () => {
//       toast.error("Provided ID number or password are incorrect");
//     },
//   });

//   return { login };
// }

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../service/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export function useLogin() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { mutate: login } = useMutation({
//     mutationFn: ({ idnumber, password }) => loginApi({ idnumber, password }),
//     onSuccess: (data) => {
//       // Set user data in query client
//       queryClient.setQueryData(["user"], data.user);

//       // Navigate based on role
//       if (data.user.userrole === "system admin") {
//         navigate("/system_admin", { replace: true });
//       } else if (data.user.userrole === "department head") {
//         navigate("/department_head", { replace: true });
//       } else {
//         navigate("/login", { replace: true }); // Redirect to a default or home route
//       }
//     },
//     onError: () => {
//       toast.error("Provided ID number or password are incorrect");
//     },
//   });

//   return { login };
// }

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../service/apiAuth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useLogin() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { mutate: login } = useMutation({
//     mutationFn: ({ idnumber, password }) => loginApi({ idnumber, password }), // Update to use idnumber
//     onSuccess: (data) => {
//       const user = data.user;
//       queryClient.setQueryData(["user"], user);

//       // Navigate based on user role
//       switch (user.userrole) {
//         case "department head":
//           navigate("/department_head", { replace: true });
//           break;
//         case "system admin":
//           navigate("/system_admin", { replace: true });
//           break;
//         default:
//           navigate("/login"); // Default case, if userrole is not recognized
//       }
//     },
//     onError: () => {
//       toast.error("Provided ID number or password are incorrect");
//     },
//   });

//   return { login };
// }

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../service/apiAuth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useLogin() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { mutate: login } = useMutation({
//     mutationFn: ({ idnumber, password }) => loginApi({ idnumber, password }), // Update to use idnumber
//     onSuccess: (user) => {
//       queryClient.setQueryData(["user"], user.user);
//       navigate("/department_head", { replace: true });
//       // Do not navigate here, let the ProtectedRoute handle the redirection
//     },
//     onError: () => {
//       toast.error("Provided ID number or password are incorrect");
//     },
//   });

//   return { login };
// }

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../service/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export function useLogin() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { mutate: login } = useMutation({
//     mutationFn: ({ email, password }) => loginApi({ email, password }),
//     onSuccess: (user) => {
//       queryClient.setQueryData(["user"], user.user);
//       navigate("/department_head", { replace: true });
//     },
//     onError: () => {
//       toast.error("Provided email or password are incorrect");
//     },
//   });

//   return { login }; // Ensure you return it as an object with the key 'login'
// }

// export function useLogin() {
//   const navigate = useNavigate();
//   const { mutate: login } = useMutation({
//     mutationFn: ({ email, password }) => loginApi({ email, password }),
//     onSuccess: (user) => {
//       console.log(user);
//       navigate("/department_head");
//     },
//     onError: (err) => {
//       console.log("ERROR", err);
//       toast.error("Provided email or password are incorrect");
//     },
//   });

//   return login;
// }
