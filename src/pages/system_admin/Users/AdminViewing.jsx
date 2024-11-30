import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase";

function SysAdminViewAdmin() {
  const { id } = useParams(); // Get the ID from URL params
  const navigate = useNavigate(); // Access the navigate function to redirect
  const [admin, setAdmin] = useState({
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

  // Fetch admin details from the database
  useEffect(() => {
    const fetchAdminDetails = async () => {
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
        setAdmin({
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
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [id]); // Runs once when component mounts

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  // Handle form save action
  const handleSave = async () => {
    try {
      // Ensure that required fields are not empty
      if (!admin.fName || !admin.lName || !admin.idNumber) {
        alert("First Name, Last Name, and ID Number are required.");
        return;
      }

      // Perform the update query
      const { error } = await supabase
        .from("User")
        .update({
          fName: admin.fName,
          lName: admin.lName,
          idNumber: admin.idNumber,
          contactNumber: admin.contactNumber,
          email: admin.email,
          birthDate: admin.birthDate,
        })
        .eq("id", id); // Update only the record with the matching ID

      if (error) throw error; // Handle any error returned from Supabase

      // Inform the user about successful update
      alert("Admin details updated successfully!");

      // Redirect back to the table after successful update
      navigate("/system_admin/Users/admin"); // Replace "/admin-table" with the actual route for the admin table page

    } catch (err) {
      console.error("Error updating admin data:", err);
      alert("Failed to update admin details.");
    }
  };

  if (loading) return <div>Loading...</div>; // Display loading message while data is being fetched

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Details</h2>
      <form>
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="fName"
            value={admin.fName}
            onChange={handleInputChange}
            disabled={!editing} // Enable editing only if in editing mode
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lName"
            value={admin.lName}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* ID Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={admin.idNumber}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Department (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Department</label>
          <input
            type="text"
            name="deptName"
            value={admin.deptName}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* User Role (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Role</label>
          <input
            type="text"
            name="userRole"
            value={admin.userRole}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={admin.contactNumber}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Birth Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={admin.birthDate}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Date Created (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date Created</label>
          <input
            type="text"
            name="dateCreated"
            value={admin.dateCreated}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          {editing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SysAdminViewAdmin;
