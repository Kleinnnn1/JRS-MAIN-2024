import { useState } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import AddNewUser from "./addUser"; // Assuming this component is used for adding users

// Mock data for users (replace with actual API data when available)
const mockUsers = [
  {
    id: "1",
    name: "Cardo Dalisay",
    designation: "Faculty",
    office: "Main Office",
    status: "Active",
    dateJoined: "2020-01-15",
  },
  {
    id: "2",
    name: "John Doe",
    designation: "Admin",
    office: "Branch Office",
    status: "Active",
    dateJoined: "2021-02-20",
  },
  {
    id: "3",
    name: "Jane Smith",
    designation: "Staff",
    office: "Remote",
    status: "Inactive",
    dateJoined: "2019-11-10",
  },
  // Add more mock users here
];

// Table headers for users
const tableHeaders = [
  "Employee ID",
  "Name",
  "Designation",
  "Office",
  "Status",
  "Date Joined",
  "Actions",
];

export default function UserContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  const handleUserFormSubmit = () => {
    // Handle user form submission if necessary (e.g., API call)
    closeModal();
  };

  // Filter users based on search term and sort by Date Joined
  const filteredUsers = mockUsers
    .filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.dateJoined) - new Date(b.dateJoined));

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Create table content or show no data message
  const tableContent = paginatedUsers.map((user) => [
    user.id,
    user.name,
    user.designation,
    user.office,
    user.status,
    user.dateJoined,
    <button
      onClick={() => alert(`Viewing user ${user.name}`)} // Placeholder action
      className="text-blue-600 hover:text-blue-800"
    >
      View
    </button>,
  ]);

  // UI Layout
  return (
    <div className=" p-6 mx-5 mb-10 bg-white rounded-lg shadow-lg">
      {/* Header with Make Request and Search */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="User /  Requestors" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddUser}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add Requestor
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>
{/* users */}
      {/* Table */}
      <Table
        columns={7}
        rows={paginatedUsers.length}
        content={tableContent}
        headers={tableHeaders}
      />

      {/* Pagination */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal for adding a new user */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
            {/* Render the AddNewUser form component */}
            <AddNewUser onSubmit={handleUserFormSubmit} closeModal={closeModal} />
          </div>
       
      )}
    </div>
  );
}
