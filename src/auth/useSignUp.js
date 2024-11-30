import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../service/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account submitted!");
    },
    onError: (error) => {
      toast.error(`Sign up failed: ${error.message}`);
    },
  });

  return { signup };
}
