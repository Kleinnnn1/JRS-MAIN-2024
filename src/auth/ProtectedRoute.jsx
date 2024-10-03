import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../store/useUserStore"; // Adjust the path as necessary
import useLogout from "../auth/useLogout"; // Import the useLogout hook

function ProtectedRoute({ children, requiredRole }) {
  const navigate = useNavigate();
  const { userMetadata } = useUserStore((state) => ({
    userMetadata: state.userMetadata,
  }));
  const { logout } = useLogout(); // Use the logout hook

  const isAuthenticated = userMetadata?.idNumber !== null;
  const userRole = userMetadata?.role;
  const isLoading = userMetadata === null; // Assuming initial state means loading

  useEffect(() => {
    if (isLoading) return; // Avoid redirecting while user data is loading

    if (!isAuthenticated) {
      navigate("/login", { replace: true }); // Redirect to login if not authenticated
    } else if (requiredRole && userRole !== requiredRole) {
      logout(); // Log out if role doesn't match
    }
  }, [isAuthenticated, navigate, requiredRole, userRole, isLoading, logout]);

  if (
    isLoading ||
    !isAuthenticated ||
    (requiredRole && userRole !== requiredRole)
  )
    return null; // Render nothing while loading or unauthorized

  return children; // Render the protected content
}

export default ProtectedRoute;

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import useUserStore from "../store/useUserStore"; // Adjust the path as necessary

// function ProtectedRoute({ children, requiredRole }) {
//   const navigate = useNavigate();
//   const { userMetadata } = useUserStore((state) => ({
//     userMetadata: state.userMetadata,
//   }));

//   const isAuthenticated = userMetadata?.idNumber !== null;
//   const userRole = userMetadata?.role;
//   const isLoading = userMetadata === null; // Assuming initial state means loading

//   useEffect(() => {
//     if (isLoading) return; // Avoid redirecting while user data is loading

//     if (!isAuthenticated) {
//       navigate("/login", { replace: true }); // Redirect to login if not authenticated
//     } else if (requiredRole && userRole !== requiredRole) {
//       navigate("/unauthorized", { replace: true }); // Redirect to unauthorized page if role doesn't match
//     }
//   }, [isAuthenticated, navigate, requiredRole, userRole, isLoading]);

//   if (
//     isLoading ||
//     !isAuthenticated ||
//     (requiredRole && userRole !== requiredRole)
//   )
//     return null; // Render nothing while loading or unauthorized

//   return children; // Render the protected content
// }

// export default ProtectedRoute;

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import useUserStore from "../store/useUserStore"; // Adjust the path as necessary

// function ProtectedRoute({ children, requiredRole }) {
//   const navigate = useNavigate();
//   const { userMetadata, setUserMetadata } = useUserStore((state) => ({
//     userMetadata: state.userMetadata,
//     setUserMetadata: state.setUserMetadata,
//   }));

//   const isAuthenticated = !!userMetadata.idNumber;
//   const userRole = userMetadata.role;
//   const isLoading = !userMetadata.idnumber && !userRole; // Assuming initial state means loading

//   useEffect(() => {
//     if (isLoading) return; // Avoid redirecting while user data is loading
//     if (!isAuthenticated) {
//       navigate("/login", { replace: true }); // Redirect to login if not authenticated
//     } else if (requiredRole && userRole !== requiredRole) {
//       navigate("/unauthorized", { replace: true }); // Redirect to unauthorized page if role doesn't match
//     }
//   }, [isAuthenticated, navigate, requiredRole, userRole, isLoading]);

//   if (
//     isLoading ||
//     !isAuthenticated ||
//     (requiredRole && userRole !== requiredRole)
//   )
//     return null; // Render nothing while loading or unauthorized

//   return children; // Render the protected content
// }

// export default ProtectedRoute;

// import { useNavigate } from "react-router-dom";
// import { useUser } from "./useUser";
// import { useEffect } from "react";

// function ProtectedRoute({ children, requiredRole }) {
//   const navigate = useNavigate();
//   const { user, isAuthenticated, userRole, isLoading } = useUser(); // Added isLoading

//   useEffect(() => {
//     if (isLoading) return; // Avoid redirecting while user data is loading
//     if (!isAuthenticated) {
//       navigate("/login", { replace: true }); // Redirect to login if not authenticated
//     } else if (requiredRole && userRole !== requiredRole) {
//       navigate("/unauthorized", { replace: true }); // Redirect to unauthorized page if role doesn't match
//     }
//   }, [isAuthenticated, navigate, user, requiredRole, userRole, isLoading]);

//   if (
//     isLoading ||
//     !isAuthenticated ||
//     !user ||
//     (requiredRole && userRole !== requiredRole)
//   )
//     return null; // Render nothing while loading or unauthorized

//   return children; // Render the protected content
// }

// export default ProtectedRoute;

// import { useNavigate } from "react-router-dom";
// import { useUser } from "./useUser";
// import { useEffect } from "react";

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useUser();

//   useEffect(() => {
//     if (user === undefined) return; // Avoid redirecting before user data is available
//     if (!isAuthenticated) {
//       navigate("/login", { replace: true }); // Redirect to login if not authenticated
//     }
//   }, [isAuthenticated, navigate, user]);

//   if (!isAuthenticated || !user) return null; // Render nothing while user is undefined or not authenticated

//   return children; // Render the protected content
// }

// export default ProtectedRoute;

// import { useNavigate } from "react-router-dom";
// import { useUser } from "./useUser";
// import { useEffect } from "react";

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   //   //1. Load the authenticated user
//   const { user, isAuthenticated } = useUser();

//   useEffect(() => {
//     if (user === undefined) return; // Avoid redirecting before user data is available
//     if (!isAuthenticated) navigate("/login");
//   }, [isAuthenticated, navigate, user]);

//   if (!user) return null; // Render nothing while user is undefined

//   return isAuthenticated ? children : null;
// }
// export default ProtectedRoute;

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   //1. Load the authenticated user
//   const { isAuthenticated } = useUser();

//   //2. If there is NO authenthicated user, redirect to /login
//   useEffect(
//     function () {
//       if (!isAuthenticated) navigate("/login");
//     },
//     [isAuthenticated, navigate]
//   );
//   //3. If there IS a user render the app

//   if (isAuthenticated) return children;
// }

// export default ProtectedRoute;
