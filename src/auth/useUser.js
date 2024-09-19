import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../service/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 10000, // Cache for 10 seconds
  });

  const userRole = user?.userRole;
  const isAuthenticated = !!user && !!userRole;

  if (!isLoading) {
    console.log("User Data:", user); // Only log when not loading
    console.log("User Role:", userRole);
    console.log("Is Authenticated:", isAuthenticated);
  }

  return { user, userRole, isAuthenticated, isLoading };
}

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//     staleTime: Infinity, // Data is considered fresh indefinitely
//     cacheTime: Infinity, // Cache the data indefinitely
//     refetchOnMount: false, // Don't refetch on component mount if cached data is available
//     refetchOnWindowFocus: false, // Prevent refetch on window focus
//     refetchOnReconnect: false, // Prevent refetch when reconnecting to the internet
//   });

//   const userRole = user?.userrole;
//   const isAuthenticated = !!user && !!userRole;

//   console.log("User Data:", user); // Debugging
//   console.log("User Role:", userRole); // Debugging
//   console.log("Is Authenticated:", isAuthenticated); // Debugging

//   return { user, userRole, isAuthenticated, isLoading };
// }

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//     staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
//     cacheTime: 10 * 60 * 1000, // Keep cache data for 10 minutes
//     refetchOnMount: false, // Don't refetch on component mount if cached data is available
//     refetchOnWindowFocus: false, // Prevent refetch on window focus
//   });

//   const userRole = user?.userrole;
//   const isAuthenticated = !!user && !!userRole;

//   console.log("User Data:", user); // Debugging
//   console.log("User Role:", userRole); // Debugging
//   console.log("Is Authenticated:", isAuthenticated); // Debugging

//   return { user, userRole, isAuthenticated, isLoading };
// }

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//     staleTime: 60000, // Cache data for 1 minute
//     cacheTime: 300000, // Keep data in cache for 5 minutes
//   });

//   const userRole = user?.userrole;
//   const isAuthenticated = !!user && !!userRole;

//   console.log("User Data:", user); // Debugging
//   console.log("User Role:", userRole); // Debugging
//   console.log("Is Authenticated:", isAuthenticated); // Debugging

//   return { user, userRole, isAuthenticated, isLoading };
// }

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//     staleTime: 60000, // Cache data for 1 minute to prevent refetches
//   });

//   const userRole = user?.userrole;
//   const isAuthenticated = !!user && !!userRole;

//   console.log("User Data:", user); // Debugging
//   console.log("User Role:", userRole); // Debugging
//   console.log("Is Authenticated:", isAuthenticated); // Debugging

//   return { user, userRole, isAuthenticated, isLoading };
// }

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser, // Pass the function reference instead of invoking it
//   });

//   return { user, isAuthenticated: user?.role === "authenticated" };
// }

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../service/apiAuth";

// export function useUser() {
//   const { data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser(),
//   });

//   return { user, isAuthenticated: user?.role === "authenticated" };
// }
