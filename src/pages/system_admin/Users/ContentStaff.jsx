import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination"; // Assuming you have this component
import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Assuming you have this component
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import SysAdminAddNewStaff from "./addNewStaff";

// Mock data for staff (replace with actual API data when available)
const mockStaff = [
  { id: "1", name: "Cardo Dalisay", jobPosition: "Faculty", employeeId: "010101" },
  { id: "2", name: "John Doe", jobPosition: "Staff", employeeId: "010102" },
  { id: "3", name: "Jane Smith", jobPosition: "Faculty", employeeId: "010103" },
  // Add more mock staff members as needed
];

const tableHeaders = ["Employee ID", "Name", "Job Position", "Action"];

export default function StaffContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal open
  const handleAddStaff = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle clicking outside the modal to close it
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter staff based on search term
  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.jobPosition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered staff
  const totalPages = Math.ceil(filteredStaff.length / rowsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Create table content
  const tableContent = paginatedStaff.map((staff) => [
    staff.employeeId,
    staff.name,
    staff.jobPosition,
    <button
      onClick={() => navigate(`/system_admin/Users/view_staff/${staff.id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      View
    </button>,
  ]);

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header with Make Request and Search */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="Staff " />
        <div className="flex space-x-4">
          <button
            onClick={handleAddStaff}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add Staff
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Table */}
      <Table columns={4} rows={paginatedStaff.length} content={tableContent} headers={tableHeaders} />

      {/* Pagination */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
{/* staffs */}
      {/* Modal for adding new staff */}
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
