import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination"; // Assuming you have this component
import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Assuming you have this component
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import SysAdminAddNewSpme from "./addNewSpme";

// Mock data for SPMEs (replace with actual API data when available)
const mockSpmeData = [
  { id: "1", employeeId: "010101", name: "Cardo Dalisay", designation: "Faculty" },
  { id: "2", employeeId: "010102", name: "John Doe", designation: "Staff" },
  { id: "3", employeeId: "010103", name: "Jane Smith", designation: "Faculty" },
  // Add more mock SPME records as needed
];
//spme

const tableHeaders = ["Employee ID", "Name", "Designation", "Action"];

export default function SpmeContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal open
  const handleAddSpme = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle clicking outside the modal to close it
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter SPMEs based on search term
  const filteredSpme = mockSpmeData.filter(
    (spme) =>
      spme.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spme.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered SPMEs
  const totalPages = Math.ceil(filteredSpme.length / rowsPerPage);
  const paginatedSpme = filteredSpme.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Create table content
  const tableContent = paginatedSpme.map((spme) => [
    spme.employeeId,
    spme.name,
    spme.designation,
    <button
      onClick={() => navigate(`/system_admin/Users/view_spme/${spme.id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      View
    </button>,
  ]);

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header with Make Request and Search */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="SPME " />
        <div className="flex space-x-4">
          <button
            onClick={handleAddSpme}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add SPME
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Table */}
      <Table columns={4} rows={paginatedSpme.length} content={tableContent} headers={tableHeaders} />

      {/* Pagination */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal for adding new SPME */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <SysAdminAddNewSpme closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
