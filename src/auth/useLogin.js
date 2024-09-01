import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/department_head", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login }; // Ensure you return it as an object with the key 'login'
}

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
