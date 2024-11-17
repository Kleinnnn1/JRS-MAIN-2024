import LogoUSTP from "/src/assets/images/logoUSTP.png";
import { useState } from "react";
import ReusableFormRow from "../components/ReusableFormRow";
import { useLogin } from "./useLogin";

export default function LogIn() {
  const [idNumber, setIdNumber] = useState(""); // Change email to idNumber
  const [password, setPassword] = useState("12345678");
  const { login } = useLogin(); // Destructure 'login' from the object

  function handleSubmit(e) {
    e.preventDefault();
    if (!idNumber || !password) return;
    login({ idNumber, password }); // Pass 'idNumber' instead of 'email'
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen min-w-screen bg-background-image bg-cover">
      {/* Dark Gray Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Card Container */}
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col items-center justify-around h-96 w-80 p-6 rounded-md bg-acc-edd bg-opacity-10 shadow-4xl"
      >
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src={LogoUSTP} className="h-20 w-20" alt="USTP Logo" />
        </div>

        {/* ID Number Field */}
        <ReusableFormRow>
          <div className="flex h-9 border border-gray-400 rounded-sm">
            <input
              className="border-l border-gray-400 p-2 outline-none"
              placeholder="ID Number"
              type="text"
              id="idNumber"
              autoComplete="username"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        </ReusableFormRow>

        {/* Password Field */}
        <ReusableFormRow>
          <div className="flex h-9 border border-gray-400 rounded-sm">
            <input
              className="border-l border-gray-400 p-2 outline-none"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </ReusableFormRow>

        {/* Terms and Privacy Policy */}
        <a href="#" className="text-xs text-center w-52">
          By logging in, I agree to the Terms of Conditions and Privacy Policy
          of JRS.
        </a>

        {/* Login Button */}
        <button
          className="w-60 p-1 font-semibold bg-yellow-500 hover:bg-yellow-600 transition duration-115 hover:ease-in"
          type="submit"
        >
          LOG IN
        </button>

        {/* Forgot Password */}
        <a href="#" className="text-xs text-center">
          Forgot Password
        </a>
      </form>
    </div>
  );
}
