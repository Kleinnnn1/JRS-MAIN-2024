import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase";

function SysAdminViewStaff() {
  const { id } = useParams(); // Get the ID from URL params
  const navigate = useNavigate(); // Access the navigate function to redirect
  const [staff, setStaff] = useState({
    fName: "",
    lName: "",
    idNumber: "",
    deptName: "",
    userRole: "",
    contactNumber: "",
    email: "",
    birthDate: "",
    dateCreated: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Flag to track if in editing mode

  // Fetch staff details from the database
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("User")
          .select(`
            id,
            fName,
            lName,
            idNumber,
            userRole,
            contactNumber,
            email,
            birthDate,
            created_at,
            Department (deptName)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;

        // Set fetched data to state
        setStaff({
          fName: data.fName || "N/A",
          lName: data.lName || "N/A",
          idNumber: data.idNumber || "N/A",
          deptName: data.Department?.deptName || "N/A",
          userRole: data.userRole || "N/A",
          contactNumber: data.contactNumber || "N/A",
          email: data.email || "N/A",
          birthDate: data.birthDate || "N/A",
          dateCreated: new Date(data.created_at).toLocaleDateString(),
        });
      } catch (err) {
        console.error("Error fetching staff data:", err);
        console.log("ID from useParams:", id);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [id]); // Runs once when component mounts

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  // Handle form save action
  const handleSave = async () => {
    try {
      // Ensure that required fields are not empty
      if (!staff.fName || !staff.lName || !staff.idNumber) {
        alert("First Name, Last Name, and ID Number are required.");
        return;
      }

      // Perform the update query
      const { error } = await supabase
        .from("User")
        .update({
          fName: staff.fName,
          lName: staff.lName,
          idNumber: staff.idNumber,
          contactNumber: staff.contactNumber,
          email: staff.email,
          birthDate: staff.birthDate,
        })
        .eq("id", id); // Update only the record with the matching ID

      if (error) throw error; // Handle any error returned from Supabase

      // Inform the user about successful update
      alert("Staff details updated successfully!");

      // Redirect back to the table after successful update
      navigate("/system_admin/Users/staff"); // Replace with the correct route

    } catch (err) {
      console.error("Error updating staff data:", err);
      alert("Failed to update staff details.");
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>; // Display loading message while data is being fetched

  return (

    
    <div className="p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg max-w-5xl">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page in browser history
          className="px-4 py-2 bg-cyan-950 text-white rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Back
        </button>
        <h2 className=" text-xl font-semibold mb-6 text-center text-blue-600">Staff Details</h2>
      </div>
      
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="fName"
            value={staff.fName}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lName"
            value={staff.lName}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* ID Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={staff.idNumber}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Department (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <input
            type="text"
            name="deptName"
            value={staff.deptName}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* User Role (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input
            type="text"
            name="userRole"
            value={staff.userRole}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={staff.contactNumber}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={staff.email}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Birth Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={staff.birthDate}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Date Created (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Created</label>
          <input
            type="text"
            name="dateCreated"
            value={staff.dateCreated}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end space-x-4 col-span-3">
          {editing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SysAdminViewStaff;
