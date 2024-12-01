import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Ensure PropTypes is imported
import { useForm } from "react-hook-form";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getCurrentUser } from "../../../service/apiAuth"; // Import the getCurrentUser function

export default function OfficeHeadViewAddStaff({ closeModal }) {
  const { handleSubmit } = useForm();
  const { signup } = useSignUp();
  const [staffAccount, setStaffAccount] = useState([
    {
      id: 1,
      idNumber: "",
      fName: "",
      lName: "",
      birthDate: "",
      email: "@gmail.com",
      contactNumber: "",
      password: "12345678",
      deptId: "", // deptId will be set from currentUser
      jobCategory: "office staff",
      userRole: "requestor", // Default userRole set to "staff"
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserAndDepartments = async () => {
      setLoading(true);

      try {
        const user = await getCurrentUser();
        setCurrentUser(user);

        // Assuming currentUser contains deptId, assign it to staffAccount
        if (user && user.deptId) {
          setStaffAccount((prevAccounts) =>
            prevAccounts.map((account) => ({
              ...account,
              deptId: user.deptId, // Set deptId from currentUser
            }))
          );
        }
      } catch (error) {
        toast.error("Failed to fetch user data.");
        console.error(error);
      }
      setLoading(false);
    };

    fetchUserAndDepartments();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleInputChange = (id, field, value) => {
    setStaffAccount((prevAccounts) =>
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
    closeModal(); // This is now correctly using the passed closeModal prop
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
        onClick={closeModal} // Use closeModal from props
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

            {/* deptId is now set from the currentUser */}
            <input
              type="text"
              placeholder="Department ID"
              className="hidden w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.deptId} // deptId comes from currentUser
              readOnly
            />
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

OfficeHeadViewAddStaff.propTypes = {
  closeModal: PropTypes.func.isRequired, // Ensure closeModal is required and a function
};
