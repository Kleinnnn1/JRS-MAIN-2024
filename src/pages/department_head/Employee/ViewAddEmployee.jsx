import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Import Supabase client
import { getCurrentUser } from "../../../service/apiAuth"; // Import the getCurrentUser function

// SysAdminAddNewStaff Component
export default function ViewAddStaff({ closeModal }) {
  const { handleSubmit } = useForm();
  const { signup } = useSignUp(); // Use the signup hook
  const [staffAccount, setstaffAccount] = useState([
    {
      id: 1,
      idNumber: "44",
      fName: "staff44",
      lName: "maintenance44",
      birthDate: "",
      email: "maintenance44@gmail.com",
      contactNumber: "44",
      password: "12345678",
      deptId: "", // deptId is fetched from currentUser
      jobCategory: "",
      jobCategories: [], // Store job categories specific to the account
      userRole: "staff", // Default userRole set to "staff"
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for departments
  const [currentUser, setCurrentUser] = useState(null); // To store the current user's data

  // Define job categories for each deptId
  const jobCategoryMap = {
    1: [
      "Cluster Leader",
      "Street Sweeper & Ground Sweeper",
      "Busser",
      "Gardener/Landscaper",
      "Housekeeper",
      "Campus Grass & Bushes Maintainer",
    ],
    2: [
      "Foreman",
      "Architect",
      "Welder",
      "Painter",
      "Draftsman",
      "Tile Setter",
      "Plumber",
      "Carpenter",
      "Engineer",
      "Laborer",
    ],
    3: [
      "Electrician",
      "Aircon Technicians",
      "Elevator Attendants",
      "Gymnasium Staff",
    ],
  };

  // Fetch current user and departments
  useEffect(() => {
    const fetchUserAndDepartments = async () => {
      setLoading(true);

      try {
        // Fetch current user
        const user = await getCurrentUser();
        setCurrentUser(user);

        if (user) {
          // Set job categories based on the user's deptId
          const jobCategoriesForDept = jobCategoryMap[user.deptId] || [];

          // Update job accounts to include the filtered job categories
          setstaffAccount((prevAccounts) =>
            prevAccounts.map((account) =>
              account.id === 1 // Only apply to the first account
                ? {
                    ...account,
                    deptId: user.deptId,
                    jobCategory: "",
                    jobCategories: jobCategoriesForDept,
                  }
                : account
            )
          );
        }
      } catch (error) {
        toast.error("Failed to fetch user data.");
        console.error(error);
      }
      setLoading(false);
    };

    fetchUserAndDepartments();
  }, []);

  // Update specific input fields based on their id and field name
  const handleInputChange = (id, field, value) => {
    setstaffAccount((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = () => {
    const hasEmptyFields = staffAccount.some(
      (account) =>
        !account.idNumber ||
        !account.fName ||
        !account.lName ||
        !account.birthDate ||
        !account.email ||
        !account.contactNumber ||
        !account.password ||
        !account.deptId ||
        !account.jobCategory
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    staffAccount.forEach((account) => {
      const newaccount = { ...account, userRole: account.userRole }; // Ensure userRole is set
      signup(newaccount); // Call the signup API
    });

    toast.success("Successfully Submitted.");
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
        onClick={closeModal}
        aria-label="Close Modal"
      >
        &times;
      </button>
      <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
        Staff Registration Form
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        {staffAccount.map((account) => (
          <div key={account.id} className="space-y-4">
            <input
              type="text"
              placeholder="Id number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.idNumber}
              onChange={(e) =>
                handleInputChange(account.id, "idNumber", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.fName}
              onChange={(e) =>
                handleInputChange(account.id, "fName", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.lName}
              onChange={(e) =>
                handleInputChange(account.id, "lName", e.target.value)
              }
              required
            />
            <input
              type="date"
              placeholder="Birth Date"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.birthDate}
              onChange={(e) =>
                handleInputChange(account.id, "birthDate", e.target.value)
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.email}
              onChange={(e) =>
                handleInputChange(account.id, "email", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.contactNumber}
              onChange={(e) =>
                handleInputChange(account.id, "contactNumber", e.target.value)
              }
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={account.password}
                onChange={(e) =>
                  handleInputChange(account.id, "password", e.target.value)
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Job Category selection based on deptId */}
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.jobCategory}
              onChange={(e) =>
                handleInputChange(account.id, "jobCategory", e.target.value)
              }
              disabled={!account.deptId}
              required
            >
              <option value="" className="hidden">
                Select Job Category
              </option>
              {account.jobCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
}

ViewAddStaff.propTypes = {
  closeModal: PropTypes.func,
};

// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import ButtonAddEmployee from "./ButtonAddEmployee";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// //THIS IS A FORM FOR ADD STAFF
// export default function ViewAddStaff() {
//   const [StaffFirstName, setStaffFirstName] = useState("");
//   const [StaffLastName, setStaffLastName] = useState("");
//   const [Birthday, setBirthday] = useState("");
//   const [IDNumber, setIDNumber] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [Job_Position, setJob_Position] = useState("");
//   const [OtherJobPosition, setOtherJobPosition] = useState(""); // For "Others" input
//   const [ContactNumber, setContactNumber] = useState(""); // New field for Contact Number
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Password validation (at least 8 characters and 1 symbol)
//     const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(Password)) {
//       Swal.fire(
//         "Error",
//         "Password must be at least 8 characters long and contain at least one symbol. <br/> Example. #PasswordEx129",
//         "error"
//       );
//       return;
//     }

//     // ID Number validation (only numeric and not empty)
//     if (!/^\d+$/.test(IDNumber) || IDNumber.trim() === "") {
//       Swal.fire(
//         "Error",
//         "ID Number must be a number and cannot be empty.",
//         "error"
//       );
//       return;
//     }

//     // Email validation (basic check for @ symbol)
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(Email)) {
//       Swal.fire("Error", "Please provide a valid email address.", "error");
//       return;
//     }

//     // Contact Number validation (should only contain numbers and must be a valid format)
//     if (!/^\d{11}$/.test(ContactNumber)) {
//       Swal.fire(
//         "Error",
//         "Contact Number must be a valid 10-digit number.",
//         "error"
//       );
//       return;
//     }

//     // If all validations pass, show success
//     Swal.fire("Success", "Successfully Added New Staff", "success");
//     // Clear the form after submission
//     setStaffFirstName("");
//     setStaffLastName("");
//     setBirthday("");
//     setIDNumber("");
//     setEmail("");
//     setPassword("");
//     setJob_Position("");
//     setOtherJobPosition(""); // Clear the other job position field
//     setContactNumber(""); // Clear contact number
//   };

//   const handleCancel = (event) => {
//     event.preventDefault();
//     Swal.fire("Cancelled", "Staff addition was cancelled", "error");
//   };

//   return (
//     <div className="rounded-lg bg-white">
//       <div className="p-2 bg-blue-950 rounded-t-md">
//         <p className="text-2xl text-center rounded-lg text-white font-bold ">
//           Employee Details
//         </p>
//       </div>
//       <hr className="m-5 mt-2" />
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="StaffFirstName"
//             >
//               First Name
//             </label>
//             <input
//               type="text"
//               id="StaffFirstName"
//               name="StaffFirstName"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={StaffFirstName}
//               onChange={(e) => setStaffFirstName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="StaffLastName"
//             >
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="StaffLastName"
//               name="StaffLastName"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={StaffLastName}
//               onChange={(e) => setStaffLastName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="Birthday"
//             >
//               Birthday
//             </label>
//             <input
//               type="date"
//               id="Birthday"
//               name="Birthday"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={Birthday}
//               onChange={(e) => setBirthday(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="IDNumber"
//             >
//               ID Number
//             </label>
//             <input
//               type="text" // Changed to text to prevent entering letters, will validate only numbers
//               id="IDNumber"
//               name="IDNumber"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={IDNumber}
//               onChange={(e) =>
//                 setIDNumber(e.target.value.replace(/[^0-9]/g, ""))
//               } // Only allow numbers
//               required
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="Email"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="Email"
//               name="Email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={Email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="Password"
//             >
//               Password
//             </label>
//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="Password"
//                 name="Password"
//                 className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 value={Password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </span>
//             </div>
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="ContactNumber"
//             >
//               Contact Number
//             </label>
//             <input
//               type="tel" // To restrict only numeric input
//               id="ContactNumber"
//               name="ContactNumber"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={ContactNumber}
//               onChange={(e) =>
//                 setContactNumber(e.target.value.replace(/[^0-9]/g, ""))
//               } // Only allow numbers
//               required
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="Job_Position"
//             >
//               Job Position
//             </label>
//             <select
//               id="Job_Position"
//               name="Job_Position"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={Job_Position}
//               onChange={(e) => setJob_Position(e.target.value)}
//               required
//             >
//               <option value="">Select Job Position</option>
//               <option value="Temporary">Temporary I reflect sa database</option>
//               <option value="Developer">Developer</option>
//               <option value="Designer">Designer</option>
//               <option value="Others">Others (please specify)</option>
//             </select>
//           </div>

//           {/* Conditionally show the "Other Job Position" field if "Others" is selected */}
//           {Job_Position === "Others" && (
//             <div>
//               <label
//                 className="block text-gray-700 font-bold mb-2"
//                 htmlFor="OtherJobPosition"
//               >
//                 Please specify the Job Position
//               </label>
//               <input
//                 type="text"
//                 id="OtherJobPosition"
//                 name="OtherJobPosition"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 value={OtherJobPosition}
//                 onChange={(e) => setOtherJobPosition(e.target.value)}
//                 required
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-center p-4">
//           <ButtonAddEmployee />
//         </div>
//       </form>
//     </div>
//   );
// }
