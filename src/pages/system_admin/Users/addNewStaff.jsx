import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertRequest } from "../../../service/apiRequestorRequestTable";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Import Supabase client

// SysAdminAddNewStaff Component
export default function SysAdminAddNewStaff({ closeModal }) {
  const { handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const [jobRequests, setJobRequests] = useState([
    {
      id: 1,
      employeeId: "",
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password: "",
      department: "",
      jobPosition: "", // Added jobPosition field
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]); // Store departments from Supabase
  const [jobPositions, setJobPositions] = useState([]); // Store job positions

  // Fetch departments with deptId 1, 2, and 3 when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("Department")
        .select("deptId, deptName")
        .in("deptId", [1, 2, 3]); // Filter for deptId 1, 2, and 3

      if (error) {
        toast.error("Failed to load departments.");
        console.error(error);
      } else {
        setDepartments(data); // Set departments in state
      }
    };

    const fetchJobPositions = async () => {
      const { data, error } = await supabase
        .from("keyword_mappings")
        .select("keyword")
        .eq("category"); // Filter for category = job_position

      if (error) {
        toast.error("Failed to load job positions.");
        console.error(error);
      } else {
        setJobPositions(data); // Set job positions in state
      }
    };

    fetchDepartments();
    fetchJobPositions();
  }, []); // Run once when the component mounts

  const { mutate } = useMutation({
    mutationFn: insertRequest,
    onSuccess: () => {
      toast.success("Successfully Registered New User");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  // Update specific input fields based on their id and field name
  const handleInputChange = (id, field, value) => {
    setJobRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, [field]: value } : request
      )
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = () => {
    const hasEmptyFields = jobRequests.some(
      (request) =>
        !request.employeeId ||
        !request.firstName ||
        !request.lastName ||
        !request.birthday ||
        !request.email ||
        !request.password ||
        !request.department ||
        !request.jobPosition // Check job position
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    jobRequests.forEach((request) => mutate(request));
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
        Staff Registration Form
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {jobRequests.map((request) => (
          <div key={request.id} className="space-y-4">
            <input
              type="text"
              placeholder="Employee ID"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={request.employeeId}
              onChange={(e) =>
                handleInputChange(request.id, "employeeId", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={request.firstName}
              onChange={(e) =>
                handleInputChange(request.id, "firstName", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={request.lastName}
              onChange={(e) =>
                handleInputChange(request.id, "lastName", e.target.value)
              }
              required
            />
            <input
              type="date"
              placeholder="Birthday"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={request.birthday}
              onChange={(e) =>
                handleInputChange(request.id, "birthday", e.target.value)
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={request.email}
              onChange={(e) =>
                handleInputChange(request.id, "email", e.target.value)
              }
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={request.password}
                onChange={(e) =>
                  handleInputChange(request.id, "password", e.target.value)
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
              value={request.department}
              onChange={(e) =>
                handleInputChange(request.id, "department", e.target.value)
              }
              required
            >
              <option value="" className="hidden">
                Select Department
              </option>
              {departments.map((dept) => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.deptName}
                </option>
              ))}
            </select>

            {/* Job Position Dropdown */}
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={request.jobPosition}
              onChange={(e) =>
                handleInputChange(request.id, "jobPosition", e.target.value)
              }
              required
            >
              <option value="" className="hidden">
                Select Job Position
              </option>
              {jobPositions.map((position) => (
                <option key={position.keyword} value={position.keyword}>
                  {position.keyword} {/* Display job position */}
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

SysAdminAddNewStaff.propTypes = {
  closeModal: PropTypes.func,
};

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { insertRequest } from "../../../service/apiRequestorRequestTable";
// import toast from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// // SysAdminAddNewAdmin Component
// export default function SysAdminAddNewStaff({ closeModal }) {
//   const { handleSubmit } = useForm();
//   const queryClient = useQueryClient();
//   const [jobRequests, setJobRequests] = useState([
//     {
//       id: 1,
//       employeeId: "",
//       firstName: "",
//       lastName: "",
//       birthday: "",
//       email: "",
//       password: "",
//       department: "",
//     },
//   ]);
//   const [showPassword, setShowPassword] = useState(false);

//   const { mutate } = useMutation({
//     mutationFn: insertRequest,
//     onSuccess: () => {
//       toast.success("Successfully Registered New User");
//       queryClient.invalidateQueries({ queryKey: ["requests"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   // Update specific input fields based on their id and field name
//   const handleInputChange = (id, field, value) => {
//     setJobRequests((prevRequests) =>
//       prevRequests.map((request) =>
//         request.id === id ? { ...request, [field]: value } : request
//       )
//     );
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const onSubmit = () => {
//     const hasEmptyFields = jobRequests.some(
//       (request) =>
//         !request.employeeId ||
//         !request.firstName ||
//         !request.lastName ||
//         !request.birthday ||
//         !request.email ||
//         !request.password ||
//         !request.department
//     );

//     if (hasEmptyFields) {
//       toast.error("Please fill out all required fields before submitting.");
//       return;
//     }

//     jobRequests.forEach((request) => mutate(request));
//     toast.success("Successfully Submitted.");
//     closeModal();
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//       {/* Close Modal Button */}
//       <button
//         className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
//         onClick={closeModal}
//         aria-label="Close Modal"
//       >
//         &times;
//       </button>

//       {/* Modal Header */}
//       <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
//         Staff Registration Form
//       </header>

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {jobRequests.map((request) => (
//           <div key={request.id} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Employee ID"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.employeeId}
//               onChange={(e) =>
//                 handleInputChange(request.id, "employeeId", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.firstName}
//               onChange={(e) =>
//                 handleInputChange(request.id, "firstName", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.lastName}
//               onChange={(e) =>
//                 handleInputChange(request.id, "lastName", e.target.value)
//               }
//               required
//             />
//             <input
//               type="date"
//               placeholder="Birthday"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.birthday}
//               onChange={(e) =>
//                 handleInputChange(request.id, "birthday", e.target.value)
//               }
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.email}
//               onChange={(e) =>
//                 handleInputChange(request.id, "email", e.target.value)
//               }
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 value={request.password}
//                 onChange={(e) =>
//                   handleInputChange(request.id, "password", e.target.value)
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
//             <input
//               type="text"
//               placeholder="Department"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.department}
//               onChange={(e) =>
//                 handleInputChange(request.id, "department", e.target.value)
//               }
//               required
//             />
//           </div>
//         ))}

//         {/* Submit Button Inside Form */}
//         <div className="text-right mt-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// SysAdminAddNewStaff.propTypes = {
//   closeModal: PropTypes.func,
// };
