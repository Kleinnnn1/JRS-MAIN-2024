import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination"; // Assuming this component exists
import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Assuming this component exists
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar"; // Assuming this component exists
import SysAdminAddNewAdmin from "./addNewAdmin"; // Ensure the path matches your file structure
import { getDepartmentHeads } from "../../../service/apiSysAdDeptHeadUser"; // Import the API function

export default function AdminContent() {
  const navigate = useNavigate();

  // States for modal, search, pagination, and data fetching
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch department heads from the backend
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getDepartmentHeads();
        const formattedData = data.flatMap((department) =>
          department.heads.map((head) => ({
            deptName: department.deptName,
            fullName: head.fullName,
            dateCreated: new Date(head.createdAt).toLocaleDateString(),
          }))
        );
        setAdmins(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching department heads:", error);
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleAddAdmin = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter admins based on search term
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

  // Table content for displaying admins
  const tableContent =
    paginatedAdmins.length > 0
      ? paginatedAdmins.map((admin, index) => [
          admin.fullName,
          admin.deptName,
          admin.dateCreated,
          <button
            key={index}
            onClick={() => navigate(`/system_admin/Users/view_admin/${index}`)} // Navigate to view specific admin
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </button>,
        ])
      : [[]]; // Default value when no admins are available

  // Table headers for admins
  const tableHeaders = [
    "Name",
    "Department",
    "Date Account Created",
    "Actions",
  ];

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header with Search and Add Admin button */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="Department Head" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddAdmin}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add Department Head
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Table */}

      <Table
        columns={4} // Adjusted for the number of columns (Name, Department, Date Created, Actions)
        rows={paginatedAdmins.length}
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

      {/* Modal for adding a new admin */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <SysAdminAddNewAdmin closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import ReusablePagination from "../../../components/ReusablePagination"; // Assuming this component exists
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Assuming this component exists
// import Table from "../../../components/Table";
// import SearchBar from "../../../components/SearchBar"; // Assuming this component exists
// import SysAdminAddNewAdmin from "./addNewAdmin"; // Ensure the path matches your file structure

// // Mock data for admins (replace with actual API data when available)
// const mockAdmins = [
//   {
//     id: "1",
//     name: "Cardo Dalisay",
//     designation: "Faculty",
//     status: "Active",
//     dateJoined: "2020-01-15",
//   },
//   {
//     id: "2",
//     name: "John Doe",
//     designation: "Admin",
//     status: "Active",
//     dateJoined: "2021-02-20",
//   },
//   {
//     id: "3",
//     name: "Jane Smith",
//     designation: "Admin",
//     status: "Inactive",
//     dateJoined: "2019-11-10",
//   },
//   // Add more mock admins here
// ];

// export default function AdminContent() {
//   const navigate = useNavigate();

//   // States for modal, search, pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddAdmin = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const handleClickOutsideModal = (e) => {
//     if (e.target.id === "modalBackdrop") closeModal();
//   };

//   // Filter admins based on search term and sort by Date Joined
//   const filteredAdmins = mockAdmins
//     .filter(
//       (admin) =>
//         admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         admin.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         admin.status?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => new Date(a.dateJoined) - new Date(b.dateJoined));

//   const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage);
//   const paginatedAdmins = filteredAdmins.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Table content for displaying admins
//   const tableContent = paginatedAdmins.map((admin) => [
//     admin.id,

//     admin.designation,

//     admin.dateJoined,
//     <button
//       onClick={() => navigate(`/system_admin/Users/view_admin/${admin.id}`)} // Navigate to view specific admin
//       className="text-blue-600 hover:text-blue-800"
//     >
//       View
//     </button>,
//   ]);

//   // Table headers for admins
//   const tableHeaders = [
//     "Name",
//     "Department",
//     "Date Account Created",
//     "Actions",
//   ];
//   // dept head
//   return (
//     <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
//       {/* Header with Search and Add Admin button */}
//       <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
//         <SearchBar title="Department Head" />
//         <div className="flex space-x-4">
//           <button
//             onClick={handleAddAdmin}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
//           >
//             Add Department Head
//           </button>
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>
//       </header>

//       {/* Table */}
//       <Table
//         columns={6} // Adjusted for the number of columns (Employee ID, Name, Designation, Status, Date Joined, Actions)
//         rows={paginatedAdmins.length}
//         content={tableContent}
//         headers={tableHeaders}
//       />

//       {/* Pagination */}
//       <ReusablePagination
//         rowsPerPage={rowsPerPage}
//         setRowsPerPage={setRowsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />

//       {/* Modal for adding a new admin */}
//       {isModalOpen && (
//         <div
//           id="modalBackdrop"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClickOutsideModal}
//         >
//           <SysAdminAddNewAdmin closeModal={closeModal} />
//         </div>
//       )}
//     </div>
//   );
// }
