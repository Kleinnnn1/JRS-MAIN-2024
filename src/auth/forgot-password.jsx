import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../service/supabase"; // Adjust the path as per your project structure

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

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://ustpjrsystem.xyz/updatePassword", // Replace with your actual update password page URL
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Reset instructions have been sent to your email.");
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again later.");
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
          <p className={`text-sm text-center mt-4 ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
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
