import imageLogin from "/src/assets/images/maintenance.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";

export default function LogIn() {
  const [idNumber, setIdNumber] = useState(""); // ID number state
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { login } = useLogin(); // Destructure 'login' from useLogin
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!idNumber || !password) return;
    login({ idNumber, password }); // Pass 'idNumber' instead of 'email'
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:block hidden w-1/2 ">
          <img className="rounded-2xl" src={imageLogin} alt="USTP Logo" />
        </div>

        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="idNumber"
              placeholder="ID Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
                onClick={togglePasswordVisibility} // Call toggle function
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
                    // Eye-slash icon when password is visible
                    <path d="M13.359 3.685C12.01 2.02 10.155.5 8 .5 5.845.5 3.99 2.02 2.641 3.685a16.42 16.42 0 0 0-1.397 2.16.5.5 0 0 0 .858.515 15.42 15.42 0 0 1 1.285-1.964c1.17-1.49 2.672-2.696 4.613-2.696 1.94 0 3.442 1.206 4.613 2.696.436.552.846 1.154 1.285 1.964a.5.5 0 0 0 .858-.515c-.362-.618-.783-1.198-1.237-1.746zM8 5a3 3 0 0 0 0 6 3 3 0 0 0 0-6zm0 1a2 2 0 0 1 0 4 2 2 0 0 1 0-4z" />
                  ) : (
                    // Eye icon when password is hidden
                    <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm11.5 0s-3 5.5-8 5.5S0 8 0 8s3-5.5 8-5.5 8 5.5 8 5.5zm-1.93 0a13.133 13.133 0 0 0-1.66-2.043C11.88 4.668 10.12 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8z" />
                  )}
                </svg>
              </button>
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="mt-5 text-xs border-b py-4 text-[#002D74]">
            <button
              onClick={() => navigate("/forgot-password")}
              className="underline hover:text-blue-600"
            >
              Forgot your password?
            </button>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button
              onClick={() => navigate("/signup")}
              className="py-2 px-5 bg-yellow-300 border rounded-xl hover:scale-110  duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
