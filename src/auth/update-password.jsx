import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../service/supabase";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility toggle
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    const token = params.get("access_token"); // Look for "access_token"
    if (token) {
      setResetToken(token);
    } else {
      setErrorMessage("Invalid or missing reset token.");
    }
  }, []);

  const togglePasswordVisibility = (isConfirm = false) => {
    if (isConfirm) {
      setShowConfirmPassword(!showConfirmPassword);
      setTimeout(() => setShowConfirmPassword(false), 3000); // Reset after 3 seconds
    } else {
      setShowPassword(!showPassword);
      setTimeout(() => setShowPassword(false), 3000); // Reset after 3 seconds
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      setErrorMessage("Invalid or missing reset token.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        access_token: resetToken,
        password,
      });

      if (error) {
        setErrorMessage(`Error updating password: ${error.message}`);
        return;
      }

      setSuccessMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-md p-5">
        <h2 className="font-bold text-2xl text-[#002D74] text-center">Update Password</h2>
        <p className="text-sm mt-2 text-center text-[#002D74]">
          Enter your new password to reset your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 relative">
          <div className="relative">
            <input
              className="p-2 rounded-xl border w-full"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => togglePasswordVisibility()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                {showPassword ? (
                  <path d="M13.359 3.685C12.01 2.02 10.155.5 8 .5 5.845.5 3.99 2.02 2.641 3.685a16.42 16.42 0 0 0-1.397 2.16.5.5 0 0 0 .858.515 15.42 15.42 0 0 1 1.285-1.964c1.17-1.49 2.672-2.696 4.613-2.696 1.94 0 3.442 1.206 4.613 2.696.436.552.846 1.154 1.285 1.964a.5.5 0 0 0 .858-.515c-.362-.618-.783-1.198-1.237-1.746zM8 5a3 3 0 0 0 0 6 3 3 0 0 0 0-6zm0 1a2 2 0 0 1 0 4 2 2 0 0 1 0-4z" />
                ) : (
                  <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm11.5 0s-3 5.5-8 5.5S0 8 0 8s3-5.5 8-5.5 8 5.5 8 5.5zm-1.93 0a13.133 13.133 0 0 0-1.66-2.043C11.88 4.668 10.12 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8z" />
                )}
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              className="p-2 rounded-xl border w-full"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => togglePasswordVisibility(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                {showConfirmPassword ? (
                  <path d="M13.359 3.685C12.01 2.02 10.155.5 8 .5 5.845.5 3.99 2.02 2.641 3.685a16.42 16.42 0 0 0-1.397 2.16.5.5 0 0 0 .858.515 15.42 15.42 0 0 1 1.285-1.964c1.17-1.49 2.672-2.696 4.613-2.696 1.94 0 3.442 1.206 4.613 2.696.436.552.846 1.154 1.285 1.964a.5.5 0 0 0 .858-.515c-.362-.618-.783-1.198-1.237-1.746zM8 5a3 3 0 0 0 0 6 3 3 0 0 0 0-6zm0 1a2 2 0 0 1 0 4 2 2 0 0 1 0-4z" />
                ) : (
                  <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm11.5 0s-3 5.5-8 5.5S0 8 0 8s3-5.5 8-5.5 8 5.5 8 5.5zm-1.93 0a13.133 13.133 0 0 0-1.66-2.043C11.88 4.668 10.12 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8z" />
                )}
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
          >
            Update Password
          </button>
        </form>

        {successMessage && (
          <p className="text-sm text-center mt-4 text-green-600">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-center mt-4 text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default UpdatePassword;
