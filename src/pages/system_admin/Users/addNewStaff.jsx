import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Import Supabase client

// SysAdminAddNewStaff Component
export default function SysAdminAddNewStaff({ closeModal }) {
  const { handleSubmit } = useForm();
  const { signup } = useSignUp(); // Use the signup hook
  const [jobAccounts, setJobAccounts] = useState([
    {
      id: 1,
      idNumber: "44",
      fName: "staff44",
      lName: "maintenance44",
      birthDate: "",
      email: "maintenance44@gmail.com",
      contactNumber: "44",
      password: "12345678",
      deptId: "",
      jobCategory: "",
      jobCategories: [], // Store job categories specific to the account
      userRole: "staff", // Default userRole set to "staff"
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]); // Store departments from Supabase
  const [loading, setLoading] = useState(true); // Loading state for departments

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

  // Fetch departments from Supabase
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Department")
        .select("deptId, deptName")
        .in("deptId", [1, 2, 3]);

      if (error) {
        toast.error("Failed to load departments.");
        console.error(error);
      } else {
        setDepartments(data);
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  // Update job categories based on the selected department for each job account
  const handleDepartmentChange = (id, deptId) => {
    const jobCategoriesForDept = jobCategoryMap[deptId] || [];

    setJobAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? {
              ...account,
              deptId,
              jobCategory: "",
              jobCategories: jobCategoriesForDept,
            }
          : account
      )
    );
  };

  // Update specific input fields based on their id and field name
  const handleInputChange = (id, field, value) => {
    setJobAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = () => {
    const hasEmptyFields = jobAccounts.some(
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

    jobAccounts.forEach((account) => {
      const newaccount = { ...account, userRole: account.userRole }; // Ensure userRole is set
      signup(newaccount); // Call the signup API
    });

    toast.success("Staff Account Successfully Created");
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
        {jobAccounts.map((account) => (
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
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.deptId}
              onChange={(e) =>
                handleDepartmentChange(account.id, Number(e.target.value))
              }
              required
            >
              <option value="" disabled>
                {loading ? "Loading Departments..." : "Select Department"}
              </option>
              {departments.map((dept) => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.deptName}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.jobCategory}
              onChange={(e) =>
                handleInputChange(account.id, "jobCategory", e.target.value)
              }
              disabled={!account.deptId}
              required
            >
              <option value="" disabled>
                {account.deptId
                  ? "Select Job Category"
                  : "Select a department first"}
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

SysAdminAddNewStaff.propTypes = {
  closeModal: PropTypes.func,
};

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useForm } from "react-hook-form";
// import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
// import toast from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import supabase from "../../../service/supabase"; // Import Supabase client

// // SysAdminAddNewStaff Component
// export default function SysAdminAddNewStaff({ closeModal }) {
//   const { handleSubmit } = useForm();
//   const { signup } = useSignUp(); // Use the signup hook
//   const [jobAccounts, setJobAccounts] = useState([
//     {
//       id: 1,
//       idNumber: "",
//       fName: "",
//       lName: "",
//       birthDate: "",
//       email: "",
//       contactNumber: "",
//       password: "",
//       deptId: "",
//       jobCategory: "",
//       jobCategories: [], // Store job categories specific to the account
//     },
//   ]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [departments, setDepartments] = useState([]); // Store departments from Supabase
//   const [loading, setLoading] = useState(true); // Loading state for departments

//   // Define job categories for each deptId
//   const jobCategoryMap = {
//     1: [
//       "Cluster Leader",
//       "Street Sweeper & Ground Sweeper",
//       "Busser",
//       "Gardener/Landscaper",
//       "Housekeeper",
//       "Campus Grass & Bushes Maintainer",
//     ],
//     2: [
//       "Foreman",
//       "Architect",
//       "Welder",
//       "Painter",
//       "Draftsman",
//       "Tile Setter",
//       "Plumber",
//       "Carpenter",
//       "Engineer",
//       "Laborer",
//     ],
//     3: [
//       "Electrician",
//       "Aircon Technicians",
//       "Elevator Attendants",
//       "Gymnasium Staff",
//     ],
//   };

//   // Fetch departments from Supabase
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("Department")
//         .select("deptId, deptName")
//         .in("deptId", [1, 2, 3]);

//       if (error) {
//         toast.error("Failed to load departments.");
//         console.error(error);
//       } else {
//         setDepartments(data);
//       }
//       setLoading(false);
//     };

//     fetchDepartments();
//   }, []);

//   // Update job categories based on the selected department for each job account
//   const handleDepartmentChange = (id, deptId) => {
//     const jobCategoriesForDept = jobCategoryMap[deptId] || [];

//     setJobAccounts((prevAccounts) =>
//       prevAccounts.map((account) =>
//         account.id === id
//           ? {
//               ...account,
//               deptId,
//               jobCategory: "",
//               jobCategories: jobCategoriesForDept,
//             }
//           : account
//       )
//     );
//   };

//   // Update specific input fields based on their id and field name
//   const handleInputChange = (id, field, value) => {
//     setJobAccounts((prevAccounts) =>
//       prevAccounts.map((account) =>
//         account.id === id ? { ...account, [field]: value } : account
//       )
//     );
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const onSubmit = () => {
//     const hasEmptyFields = jobAccounts.some(
//       (account) =>
//         !account.idNumber ||
//         !account.fName ||
//         !account.lName ||
//         !account.birthDate ||
//         !account.email ||
//         !account.contactNumber ||
//         !account.password ||
//         !account.deptId ||
//         !account.jobCategory
//     );

//     if (hasEmptyFields) {
//       toast.error("Please fill out all required fields before submitting.");
//       return;
//     }

//     jobAccounts.forEach((account) => {
//       const newaccount = { ...account, userRole: account.jobCategory };
//       signup(newaccount); // Call the signup API
//     });

//     toast.success("Successfully Submitted.");
//     closeModal();
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//       <button
//         className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
//         onClick={closeModal}
//         aria-label="Close Modal"
//       >
//         &times;
//       </button>
//       <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
//         Staff Registration Form
//       </header>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {jobAccounts.map((account) => (
//           <div key={account.id} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Id number"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.idNumber}
//               onChange={(e) =>
//                 handleInputChange(account.id, "idNumber", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.fName}
//               onChange={(e) =>
//                 handleInputChange(account.id, "fName", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.lName}
//               onChange={(e) =>
//                 handleInputChange(account.id, "lName", e.target.value)
//               }
//               required
//             />
//             <input
//               type="date"
//               placeholder="Birth Date"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.birthDate}
//               onChange={(e) =>
//                 handleInputChange(account.id, "birthDate", e.target.value)
//               }
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.email}
//               onChange={(e) =>
//                 handleInputChange(account.id, "email", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Contact Number"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.contactNumber}
//               onChange={(e) =>
//                 handleInputChange(account.id, "contactNumber", e.target.value)
//               }
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 value={account.password}
//                 onChange={(e) =>
//                   handleInputChange(account.id, "password", e.target.value)
//                 }
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-2 text-gray-500"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <select
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.deptId}
//               onChange={(e) =>
//                 handleDepartmentChange(account.id, Number(e.target.value))
//               }
//               required
//             >
//               <option value="" disabled>
//                 {loading ? "Loading Departments..." : "Select Department"}
//               </option>
//               {departments.map((dept) => (
//                 <option key={dept.deptId} value={dept.deptId}>
//                   {dept.deptName}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={account.jobCategory}
//               onChange={(e) =>
//                 handleInputChange(account.id, "jobCategory", e.target.value)
//               }
//               disabled={!account.deptId}
//               required
//             >
//               <option value="" disabled>
//                 {account.deptId
//                   ? "Select Job Category"
//                   : "Select a department first"}
//               </option>
//               {account.jobCategories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Staff
//         </button>
//       </form>
//     </div>
//   );
// }

// SysAdminAddNewStaff.propTypes = {
//   closeModal: PropTypes.func,
// };
