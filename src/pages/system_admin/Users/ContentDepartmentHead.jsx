import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import SysAdminAddNewAdmin from "./addNewAdmin";
import supabase from "../../../service/supabase";

export default function AdminContent() {
  const navigate = useNavigate();

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch department heads from the backend
  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from("User")
        .select(
          `
          id,
          fullName,
          userRole,
          created_at,
          Department (deptName)
        `
        )
        .in("userRole", ["department head", "office head", "spme"]); // Only fetch relevant roles

      if (error) throw error;

      const formattedData = data.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        deptName: user.Department?.deptName || "N/A", // Handle missing department names
        dateCreated: new Date(user.created_at).toLocaleDateString(),
      }));

      setAdmins(formattedData);
    } catch (err) {
      console.error("Error fetching department heads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();

    // Subscribe to real-time updates for the 'User' table
    const channel = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        () => {
          fetchAdmins(); // Refresh data on updates
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Cleanup subscription
    };
  }, []);

  const handleAddAdmin = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filter and paginate admins
  const filteredAdmins = admins
    .filter(
      (admin) =>
        admin.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.deptName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));

  const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const tableContent = paginatedAdmins.map((admin) => [
    admin.fullName,
    admin.deptName,
    admin.dateCreated,
    <button
      key={admin.id}
      onClick={() => navigate(`/system_admin/Users/view_admin/${admin.id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      View
    </button>,
  ]);

  const tableHeaders = ["Name", "Department", "Date Created", "Actions"];

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      <header className= "py-4 px-6 bg-custom-blue flex justify-between items-center rounded-t-lg">
        <SearchBar title="Department Head" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddAdmin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add Department Head
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      <Table
        columns={4}
        rows={paginatedAdmins.length}
        content={tableContent}
        headers={tableHeaders}
      />

      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => e.target.id === "modalBackdrop" && closeModal()}
        >
          <SysAdminAddNewAdmin closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
