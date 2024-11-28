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
