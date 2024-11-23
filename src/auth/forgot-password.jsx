import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // State to hold email input
  const [message, setMessage] = useState(""); // State to hold feedback message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    // Simulate sending reset instructions (replace with API call)
    try {
      // Replace this with actual API logic
      setTimeout(() => {
        setMessage("Reset instructions have been sent to your email.");
      }, 1000);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-md p-5">
        <h2 className="font-bold text-2xl text-[#002D74] text-center">
          Forgot Password
        </h2>
        <p className="text-sm mt-2 text-center text-[#002D74]">
          Enter your email to receive reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            className="p-2 rounded-xl border"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
          >
            Send Reset Instructions
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-green-600">{message}</p>
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
