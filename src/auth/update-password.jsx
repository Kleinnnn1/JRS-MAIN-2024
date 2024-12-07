import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [message, setMessage] = useState(""); // Success message
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const navigate = useNavigate();
  const location = useLocation();

  // Extract reset token from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

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
      // Simulate API call to update the password (replace with real API logic)
      setTimeout(() => {
        setMessage("Your password has been updated successfully.");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      }, 1000);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-md p-5">
        <h2 className="font-bold text-2xl text-[#002D74] text-center">
          Update Password
        </h2>
        <p className="text-sm mt-2 text-center text-[#002D74]">
          Enter your new password to reset your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            className="p-2 rounded-xl border"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="p-2 rounded-xl border"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
          >
            Update Password
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-green-600">{message}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-center mt-4 text-red-600">{errorMessage}</p>
        )}

        <div className="mt-4 text-xs flex justify-between items-center text-[#002D74]">
          <button
            onClick={() => navigate("/login")}
            className="underline hover:scale-105 duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    </section>
  );
}
