import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SysAdminAddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentLocation, setDepartmentLocation] = useState("");
  const [departmentEmail, setDepartmentEmail] = useState("");
  const [departmentContactNo, setDepartmentContactNo] = useState("");
  const [DeptDescription, setDeptDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log("Department Name:", departmentName);
    console.log("Department Location:", departmentLocation);
    console.log("Department Email:", departmentEmail);
    console.log("Department Contact No:", departmentContactNo);
    console.log("Description:", DeptDescription);

    // Display success message
    Swal.fire("Success", "Successfully Added New Department", "success");

    // Clear the form after submission
    setDepartmentName("");
    setDepartmentLocation("");
    setDepartmentEmail("");
    setDepartmentContactNo("");
    setDeptDescription("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Display cancellation message
    Swal.fire("Cancelled", "Department addition was cancelled", "error");
  };

  return (
    <div className="m-5 bg-white shadow-md rounded-lg">
      <div className="bg-yellow-500 p-5 rounded-t-lg">
        <p className="text-xl font-bold text-gray-600">
          New Department Information
        </p>
      </div>
      <form className="items items-center">
        <div className="flex">
          <div className="m-5">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="departmentName"
            >
              Office Name
            </label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mr-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 m-2 text-white py-2 px-2 rounded-lg hover:bg-yellow-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 m-2 text-white py-2 px-2 rounded-lg hover:bg-yellow-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
