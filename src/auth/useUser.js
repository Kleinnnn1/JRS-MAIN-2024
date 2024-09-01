import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../service/apiAuth";

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser, // Pass the function reference instead of invoking it
  });

  return { user, isAuthenticated: user?.role === "authenticated" };
}

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser(),
//   });

//   return { user, isAuthenticated: user?.role === "authenticated" };
// }
