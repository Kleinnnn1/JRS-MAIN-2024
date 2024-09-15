import LogoUSTP from "/src/assets/images/logoUSTP.png";
import { useState } from "react";
import ReusableFormRow from "../components/ReusableFormRow";
import { useLogin } from "./useLogin";

export default function LogIn() {
  const [idnumber, setIdNumber] = useState(""); // Change email to idnumber
  const [password, setPassword] = useState("12345678");
  const { login } = useLogin(); // Destructure 'login' from the object

  function handleSubmit(e) {
    e.preventDefault();
    if (!idnumber || !password) return;
    login({ idnumber, password }); // Pass 'idnumber' instead of 'email'
  }

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-background-image bg-cover">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-around h-96 w-80 p-6 rounded-sm bg-acc-edd shadow-4xl"
      >
        <div className="flex flex-col items-center">
          <img src={LogoUSTP} className="h-20 w-20" alt="USTP Logo" />
        </div>

        <ReusableFormRow>
          <div className="flex h-9 border border-gray-400 rounded-sm">
            <input
              className="border-l border-gray-400 p-2 outline-none"
              placeholder="ID Number"
              type="text"
              id="idnumber"
              autoComplete="username"
              value={idnumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        </ReusableFormRow>

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

        <a href="" className="text-xs text-center w-52">
          By logging in, I agree to the Terms of Conditions and Privacy Policy
          of JRS.
        </a>

        <button
          className="w-60 p-1 font-semibold bg-yellow-500 hover:bg-yellow-600 transition duration-115 hover:ease-in"
          type="submit"
        >
          LOG IN
        </button>

        <a href="" className="text-xs text-center">
          Forgot Password
        </a>
      </form>
    </div>
  );
}

// import LogoUSTP from "/src/assets/images/logoUSTP.png";
// import { useState } from "react";
// import ReusableFormRow from "../components/ReusableFormRow";
// import { useLogin } from "./useLogin";

// export default function LogIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useLogin(); // Destructure 'login' from the object

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!email || !password) return;
//     login({ email, password });
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen min-w-screen bg-background-image bg-cover">
//       <form
//         method="POST"
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center justify-around h-96 w-80 p-6 rounded-sm  bg-acc-edd shadow-4xl"
//       >
//         <div className="flex flex-col items-center">
//           <img src={LogoUSTP} className="h-20 w-20" />
//         </div>

//         <ReusableFormRow>
//           <div className="flex h-9 border border-gray-400 rounded-sm">
//             <input
//               className="border-l border-gray-400 p-2 outline-none"
//               placeholder="email"
//               type="text"
//               id="email"
//               autoComplete="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </ReusableFormRow>

//         <ReusableFormRow>
//           <div className="flex h-9 border border-gray-400 rounded-sm">
//             <input
//               className="border-l border-gray-400 p-2 outline-none"
//               placeholder="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </ReusableFormRow>

//         <a href="" className="text-xs text-center  w-52">
//           By logging in, I agree to the Terms of Conditions and Privacy Policy
//           of JRS.
//         </a>

//         <button
//           className="w-60 p-1 font-semibold bg-yellow-500 hover:bg-yellow-600 transition duration-115 hover:ease-in"
//           type="submit"
//         >
//           LOG IN
//         </button>

//         <a href="" className="text-xs text-center ">
//           Forgot Password
//         </a>
//       </form>
//     </div>
//   );
// }
