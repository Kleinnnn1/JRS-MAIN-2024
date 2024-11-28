// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import ReusableBackButton from '../../../components/ReusableBackButton';
// import ButtonAddEmployee from './ButtonAddEmployee';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// export default function SysAdminAddNewAdmin() {

//   const [AdminfName, setAdminfName] = useState('');
//   const [AdminlName, setAdminLastName] = useState('');
//   const [birthDate, setbirthDate] = useState('');
//   const [IDNumber, setIDNumber] = useState('');
//   const [Email, setEmail] = useState('');
//   const [Password, setPassword] = useState('');
//   const [Department_Office, setDepartment_Office] = useState('');
//   const [Job_Position, setJob_Position] = useState('');

//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission

//     Swal.fire('Success', 'Successfully Added New Admin', 'success');
//     // Clear the form after submission
//     setAdminFirstName('');
//     setAdminLastName('');
//     setbirthDate('');
//     setIDNumber('');
//     setEmail('');
//     setPassword('');
//     setDepartment_Office('');
//     setJob_Position('');
//   };

//   const handleCancel = (event) => {
//     event.preventDefault();
//     Swal.fire('Cancelled', 'Admin addition was cancelled', 'error');
//   };

//   return (
//     <div className="m-16 bg-white shadow-md rounded-lg">
//       <div className="bg-yellow-500 p-5 rounded-t-lg">
//         <p className="text-xl font-bold text-gray-600">New Admin Information</p>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
//           <div>
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="AdminFirstName">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="AdminFirstName"
//               name="AdminFirstName"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={AdminFirstName}
//               onChange={(e) => setAdminFirstName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="AdminLastName">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="AdminLastName"
//               name="AdminLastName"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={AdminLastName}
//               onChange={(e) => setAdminLastName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="Birthday">
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
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="IDNumber">
//               ID Number
//             </label>
//             <input
//               type="text"
//               id="IDNumber"
//               name="IDNumber"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={IDNumber}
//               onChange={(e) => setIDNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="Email">
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
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="Password">
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
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="Department_Office">
//               Department/Office
//             </label>
//             <input
//               type="text"
//               id="Department_Office"
//               name="Department_Office"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={Department_Office}
//               onChange={(e) => setDepartment_Office(e.target.value)}
//               required
//             />
//           </div>

//         </div>
//         <div className="flex justify-end p-4">
//           <ReusableBackButton marginRight={`mr-4`} />
//           <ButtonAddEmployee />
//         </div>
//       </form>
//     </div>
//   );
// }
// __________________________________________________________________________________________________________
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Import your Supabase client

// SysAdminAddNewAdmin Component
export default function SysAdminAddNewAdmin({ closeModal }) {
  const { handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { signup } = useSignUp(); // Use the signup hook
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      idNumber: "1",
      fName: "1",
      lName: "1",
      birthDate: "",
      email: "1@gmail.com",
      password: "12345678",
      contactNumber: "1", // Add contactNumber to account state
      deptId: "", // Renamed to deptId
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]); // Store departments from Supabase

  // Fetch departments from Supabase when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("Department")
        .select("deptId, deptName");

      if (error) {
        toast.error("Failed to load departments.");
        console.error(error);
      } else {
        setDepartments(data); // Set departments in state
      }
    };

    fetchDepartments();
  }, []); // Run once when the component mounts

  // Update specific input fields based on their id and field name
  const handleInputChange = (id, field, value) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = () => {
    const hasEmptyFields = accounts.some(
      (account) =>
        !account.idNumber ||
        !account.fName ||
        !account.lName ||
        !account.birthDate ||
        !account.email ||
        !account.contactNumber || // Check for contactNumber
        !account.deptId // Check for deptId
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    // Map accounts to signup payload and assign userRole based on deptId
    accounts.forEach((account) => {
      const userRole = [1, 2, 3].includes(account.deptId)
        ? "department head"
        : "office head";

      const newUser = {
        idNumber: account.idNumber,
        fName: account.fName,
        lName: account.lName,
        birthDate: account.birthDate,
        email: account.email,
        contactNumber: account.contactNumber, // Add contactNumber to the payload
        password: "12345678", // Default password
        deptId: account.deptId, // This is now deptId (department ID)
        userRole: userRole, // Set the userRole based on deptId
      };

      signup(newUser); // Call the signup API
    });

    toast.success("Successfully Submitted.");
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      {/* Close Modal Button */}
      <button
        className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
        onClick={closeModal}
        aria-label="Close Modal"
      >
        &times;
      </button>

      {/* Modal Header */}
      <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
        Department Head Registration Form
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {accounts.map((account) => (
          <div key={account.id} className="space-y-4">
            <input
              type="text"
              placeholder="Employee ID"
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
              placeholder="birthDate"
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
              type="tel"
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

            {/* Department Dropdown */}
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.deptId} // Now uses deptId
              onChange={(e) => {
                handleInputChange(account.id, "deptId", e.target.value); // Update deptId
              }}
              required
            >
              <option value="" className="hidden">
                Select Department
              </option>
              {departments.map((dept) => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.deptName} {/* Displays department name */}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Submit Button Inside Form */}
        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

SysAdminAddNewAdmin.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
