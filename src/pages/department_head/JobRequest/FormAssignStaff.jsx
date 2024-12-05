import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import supabase from "../../../service/supabase"; // Ensure this is configured
import SearchBar from "../../../components/SearchBar";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import { insertStaff } from "../../../service/apiAssignStaff";

export default function FormAssignStaff({ onClose }) {
  const { handleSubmit, reset } = useForm();

  // Fetch jobPosition and location from Zustand store
  const { jobPosition, location, description } = useAssignmentStore(
    (state) => ({
      description: state.description,
      jobPosition: state.jobPosition,
      location: state.location,
    })
  );

  const [staffNameOptions, setStaffNameOptions] = useState({});
  const [assignments, setAssignments] = useState([
    {
      id: Date.now(),
      description: description || "",
      jobPosition: jobPosition || "",
      location: location || "",
      staffName: "",
    },
  ]);

  // Fetch staff names from Supabase
  const fetchStaffNames = async () => {
    try {
      // Fetch all staff names without filtering
      const { data: allStaff, error: staffError } = await supabase
        .from("User")
        .select("jobCategory, fullName");

      if (staffError) throw staffError;

      const groupedStaff = allStaff.reduce((acc, user) => {
        if (!acc[user.jobCategory]) acc[user.jobCategory] = [];
        acc[user.jobCategory].push(user.fullName);
        return acc;
      }, {});

      setStaffNameOptions(groupedStaff);
    } catch (error) {
      console.error("Error fetching staff names:", error);
      toast.error("Failed to load staff names.");
    }
  };

  useEffect(() => {
    fetchStaffNames();
  }, []);

  useEffect(() => {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment, index) =>
        index === 0 // Only modify the first row or adapt as needed
          ? {
              ...assignment,
              description: description || assignment.description,
              jobPosition: jobPosition || assignment.jobPosition,
              location: location || assignment.location,
            }
          : assignment
      )
    );
  }, [jobPosition, location, description]);

  const handleAddRow = () => {
    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        description: description || "",
        jobPosition: jobPosition || "",
        location: location || "",
        staffName: "",
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, [field]: value } : assignment
      )
    );
  };

  const onSubmit = async () => {
    // Check for any empty fields
    const hasEmptyFields = assignments.some(
      (assignment) =>
        !assignment.jobPosition || !assignment.location || !assignment.staffName
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    // Check if the same staffName is assigned to multiple requests
    const staffNames = assignments.map((assignment) => assignment.staffName);
    const duplicateStaffNames = staffNames.filter(
      (staffName, index) => staffNames.indexOf(staffName) !== index
    );

    if (duplicateStaffNames.length > 0) {
      toast.error(
        "One staff member cannot be assigned to multiple job requests."
      );
      return;
    }

    try {
      // Insert staff assignments
      await insertStaff(assignments);

      toast.success("Staff assignment(s) successfully submitted.");
      reset();
      onClose();
      setAssignments([
        {
          id: Date.now(),
          description: description || "",
          jobPosition: jobPosition || "",
          location: location || "",
          staffName: "",
        },
      ]);
    } catch (error) {
      console.error("Failed to assign staff:", error);
      toast.error("An error occurred while assigning staff. Please try again.");
    }
  };

  return (
    <div className="rounded-lg">
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <SearchBar title="Assign Staff" />
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">Description</th>
                <th className="px-4 py-2 border">Job Position</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Staff Name</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      value={assignment.description}
                      disabled
                      className="w-full px-2 py-1 border rounded focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      value={assignment.jobPosition}
                      disabled
                      className="w-full px-2 py-1 border rounded focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      value={assignment.location}
                      disabled
                      className="w-full px-2 py-1 border rounded focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      value={assignment.staffName}
                      onChange={(e) =>
                        handleInputChange(
                          assignment.id,
                          "staffName",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded focus:outline-none"
                      required
                    >
                      <option value="" disabled className="hidden">
                        Select Staff
                      </option>
                      {staffNameOptions[assignment.jobPosition]?.map(
                        (staff, idx) => (
                          <option key={idx} value={staff}>
                            {staff}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {assignments.indexOf(assignment) ===
                      assignments.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddRow}
                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                      >
                        +
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(assignment.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Assign Staff
          </button>
        </div>
      </form>
    </div>
  );
}
