import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //   //1. Load the authenticated user
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    if (user === undefined) return; // Avoid redirecting before user data is available
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate, user]);

  if (!user) return null; // Render nothing while user is undefined

  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
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
