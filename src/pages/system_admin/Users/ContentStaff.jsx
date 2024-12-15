import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import SysAdminAddNewStaff from "./addNewStaff";
import supabase from "../../../service/supabase";

export default function StaffContent() {
  const navigate = useNavigate();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch staff from the backend
  const fetchStaffs = async () => {
    try {
      const { data, error } = await supabase
        .from("User")
        .select(
          `
          id,
          fullName,
          userRole,
          created_at,
          jobCategory,
          Department (deptName)
        `
        )
        .in("userRole", ["staff"]); // Only fetch relevant roles

      if (error) throw error;

      console.log("Fetched Data: ", data); // Log the data

      // Filter departments to include only BGMS, MEWS, and CSWS
      const filteredData = data.filter((department) =>
        ["BGMS", "MEWS", "CSWS"].includes(department.Department?.deptName)
      );

      // Map and format the data
      const formattedData = filteredData.map((department) => ({
        id: department.id, // Include the `id` here
        deptName: department.Department?.deptName || "Unknown",
        fullName: department.fullName || "Unknown",
        birthDate: new Date(department.created_at).toLocaleDateString(),
        jobCategory: department.jobCategory || "Unknown",
      }));

      setStaffs(formattedData); // Set formatted data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staff:", error);
      setLoading(false);
    }
  };

  // UseEffect to fetch initial data and setup realtime subscription
  useEffect(() => {
    // Fetch initial data
    fetchStaffs();

    // Subscribe to realtime updates from the User table
    const channel = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        async (payload) => {
          console.log("Realtime event:", payload);
          await fetchStaffs(); // Refresh data on any change
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle modal visibility
  const handleAddStaff = () => setIsModalOpen(true);
  const closeModal = async () => {
    setIsModalOpen(false);
    await fetchStaffs(); // Ensure data is refreshed after closing the modal
  };
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter Staffs based on search term
  const filteredStaffs = Staffs.filter(
    (staff) =>
      staff.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.deptName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.jobCategory?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.fullName.localeCompare(b.fullName));

  const totalPages = Math.ceil(filteredStaffs.length / rowsPerPage);
  const paginatedStaffs = filteredStaffs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table content
  const tableContent = paginatedStaffs.map((staff) => [
    staff.fullName,
    staff.deptName,
    staff.birthDate,
    staff.jobCategory,
    <button
      key={staff.id}
      onClick={() => navigate(`/system_admin/Users/view_staff/${staff.id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      View
    </button>,
  ]);

  const tableHeaders = [
    "Full Name",
    "Department",
    "Birthday",
    "Job Category",
    "Actions",
  ];

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="Staff" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddStaff}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add Maintenance Staff
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={5}
          rows={paginatedStaffs.length}
          content={tableContent}
          headers={tableHeaders}
        />
      )}

      {/* Pagination */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <SysAdminAddNewStaff closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
