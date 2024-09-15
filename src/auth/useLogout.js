import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore"; // Adjust the path as necessary

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearUserMetadata = useUserStore((state) => state.clearUserMetadata);

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear user metadata
      clearUserMetadata();

      // Invalidate and remove queries
      queryClient.removeQueries();

      // Navigate to login page
      navigate("/login", { replace: true });
    },
  });

  return { logout };
}

export default useLogout;

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { logout as logoutApi } from "../service/apiAuth";
// import { useNavigate } from "react-router-dom";

// export function useLogout() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { mutate: logout } = useMutation({
//     mutationFn: logoutApi,
//     onSuccess: () => {
//       queryClient.removeQueries();
//       navigate("/login", { replace: true });
//     },
//   });

//   return { logout };
// }

// export default useLogout;
