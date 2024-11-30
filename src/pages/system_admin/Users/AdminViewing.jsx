import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase";

function SysAdminViewAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [editing, setEditing] = useState(false); // Tracks if the form is in edit mode

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

        setAdmin({
          fName: data.fName || "N/A",
          lName: data.lName || "N/A",
          idNumber: data.idNumber || "N/A",
          deptName: data.Department?.deptName || "N/A",
          userRole: data.userRole,
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
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
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
        .eq("id", id);

      if (error) throw error;

      alert("Admin details updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating admin data:", err);
      alert("Failed to update admin details.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="fName"
            value={admin.fName}
            onChange={handleInputChange}
            disabled={!editing}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
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
