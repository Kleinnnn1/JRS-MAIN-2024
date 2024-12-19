import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import supabase from "../../../service/supabase"; // Ensure this is configured
import SearchBar from "../../../components/SearchBar";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import { insertStaff } from "../../../service/apiAssignStaff";
import { getCurrentUser } from "../../../service/apiAuth";
import { useNavigate } from "react-router-dom";

export default function FormAssignStaff({ onClose }) {
  const { handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // Fetch jobPosition from Zustand store
  const { jobPosition } = useAssignmentStore((state) => ({
    jobPosition: state.jobPosition,
  }));

  const [jobCategories, setJobCategories] = useState([]); // Unique job categories
  const [staffNameOptions, setStaffNameOptions] = useState({}); // Staff names grouped by jobCategory
  const [assignments, setAssignments] = useState([
    {
      id: Date.now(),
      jobPosition: jobPosition || "",
      staffName: "",
    },
  ]);

  // Fetch job categories and staff names
  const fetchJobCategoriesAndStaff = async () => {
    try {
      // Fetch current user's deptId
      const currentUser = await getCurrentUser();

      if (!currentUser || !currentUser.deptId) {
        toast.error("Failed to fetch current user's department.");
        return;
      }

      // Fetch job categories and staff names matching current user's deptId
      const { data: staffData, error: staffError } = await supabase
        .from("User")
        .select("jobCategory, fullName, deptId")
        .eq("deptId", currentUser.deptId);

      if (staffError) throw staffError;

      // Extract unique job categories
      const uniqueJobCategories = [
        ...new Set(staffData.map((user) => user.jobCategory)),
      ];

      // Group staff names by jobCategory
      const groupedStaff = staffData.reduce((acc, user) => {
        if (!acc[user.jobCategory]) acc[user.jobCategory] = [];
        acc[user.jobCategory].push(user.fullName);
        return acc;
      }, {});

      setJobCategories(uniqueJobCategories);
      setStaffNameOptions(groupedStaff);
    } catch (error) {
      console.error("Error fetching job categories and staff:", error);
      toast.error("Failed to load job categories or staff names.");
    }
  };

  useEffect(() => {
    fetchJobCategoriesAndStaff();
  }, []);

  const handleAddRow = () => {
    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        jobPosition: jobPosition || "",
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
      (assignment) => !assignment.jobPosition || !assignment.staffName
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

      // Navigate to the job ongoing page after success
      navigate("/department_head/job_ongoing");
      setAssignments([
        {
          id: Date.now(),
          jobPosition: jobPosition || "",
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
                <th className="px-4 py-2 border">Job Position</th>
                <th className="px-4 py-2 border">Staff Name</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-4 py-2 border">
                    <select
                      value={assignment.jobPosition}
                      onChange={(e) =>
                        handleInputChange(
                          assignment.id,
                          "jobPosition",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded focus:outline-none"
                      required
                    >
                      <option value="" disabled className="hidden">
                        Select Job Category
                      </option>
                      {jobCategories.map((jobCategory, idx) => (
                        <option key={idx} value={jobCategory}>
                          {jobCategory}
                        </option>
                      ))}
                    </select>
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
