import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import supabase from "../../../service/supabase";
import AddNewUser from "./addUser"; // Component for adding users

export default function UserContent() {
  const navigate = useNavigate();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Users, se] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user from the backend
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("Department")
        .select(`
          deptName,
          User (
            fullName,
            birthDate,
            userRole,
            created_at
          )
        `);
      if (error) throw error;

      // Filter departments to include only BGMS, MEWS, and CSWS
      const filteredData = data.filter(
        (department) =>
          ["BGMS", "MEWS", "CSWS"].includes(department.deptName)
      );

      const formattedData = filteredData.flatMap((department) =>
        department.User.map((user) => ({
          deptName: department.deptName,
          fullName: user.fullName,
          birthDate: new Date(user.birthDate).toLocaleDateString(),
          userRole: user.userRole,
        }))
      );

      se([...formattedData]); // Ensure a new reference for re-render
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  // UseEffect to fetch initial data and setup realtime subscription
  useEffect(() => {
    // Fetch initial data
    fetchUsers();

    // Subscribe to realtime updates from the User table
    const channel = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        async (payload) => {
          console.log("Realtime event:", payload);
          await fetchUsers(); // Refresh data on any change
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAddUser = () => setIsModalOpen(true);
  const closeModal = async () => {
    setIsModalOpen(false);
    await fetchUsers(); // Ensure data is refreshed after closing the modal
  };
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter Users based on search term
  const filteredUsers = Users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.deptName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userRole?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.fullName.localeCompare(b.fullName));

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table content
  const tableContent =
    paginatedUsers.length > 0
      ? paginatedUsers.map((user, index) => [
          user.fullName,
          user.deptName,
          user.birthDate,
          user.userRole,
          <button
            key={index}
            onClick={() => navigate(`/system_admin/Users/view_user/${index}`)}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </button>,
        ])
      : [[]];

  const tableHeaders = [
    "Full Name",
    "Department",
    "Birthday",
    "User Role",
    "Actions",
  ];

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="user" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddUser}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Add New Requestor
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Table */}
      <Table
        columns={5}
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

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <SysAdminAddNewuser closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import Table from "../../../components/Table";
// import SearchBar from "../../../components/SearchBar";
// import supabase from "../../../service/supabase";
// import AddNewUser from "./addUser"; // Component for adding users

// // Table headers for users
// const tableHeaders = [
//   "Employee ID",
//   "Name",
//   "Office/Department",
//   "Date Account Created",
//   "Actions",
// ];

// export default function UserContent() {
//   const [users, setUsers] = useState([]); // State for users fetched from the backend
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch requestors from Supabase
//   const fetchRequestors = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("User")
//         .select(
//           `
//           idNumber,
//           fullName,
//           created_at,
//           Department (
//             deptName
//           )
//         `
//         )
//         .eq("userRole", "requestor");

//       if (error) throw error;

//       // Map data to match table structure
//       const mappedData = data.map((user) => ({
//         id: user.idNumber,
//         name: user.fullName,
//         office: user.Department?.deptName || "No Department",
//         dateJoined: new Date(user.created_at).toISOString().split("T")[0], // Format date
//       }));

//       setUsers(mappedData);
//     } catch (error) {
//       console.error("Error fetching requestors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRequestors(); // Fetch data on component mount
//   }, []);

//   const handleAddUser = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);
//   const handleClickOutsideModal = (e) => {
//     if (e.target.id === "modalBackdrop") closeModal();
//   };

//   const handleUserFormSubmit = () => {
//     // Handle user form submission if necessary
//     closeModal();
//     fetchRequestors(); // Refresh the data after adding a user
//   };

//   // Filter users based on search term and sort by date joined
//   const filteredUsers = users
//     .filter(
//       (user) =>
//         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.office?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => new Date(a.dateJoined) - new Date(b.dateJoined));

//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Create table content or provide default empty rows
//   const tableContent =
//     paginatedUsers.length > 0
//       ? paginatedUsers.map((user) => [
//           user.id,
//           user.name,
//           user.office,
//           user.dateJoined,
//           <button
//             onClick={() => alert(`Viewing user ${user.name}`)} // Placeholder action
//             className="text-blue-600 hover:text-blue-800"
//           >
//             View
//           </button>,
//         ])
//       : [[]]; // Default empty row if no data is available

//   return (
//     <div className="p-6 mx-5 mb-10 bg-white rounded-lg shadow-lg">
//       <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
//         <SearchBar title="Requestors" />
//         <div className="flex space-x-4">
//           <button
//             onClick={handleAddUser}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
//           >
//             Add Requestor
//           </button>
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>
//       </header>

//       {/* Table and No Data State */}
//       {/* Table */}
//       <Table
//         columns={7}
//         rows={paginatedUsers.length}
//         content={tableContent}
//         headers={tableHeaders}
//       />

//       {/* Pagination */}
//       {users.length > 0 && (
//         <ReusablePagination
//           rowsPerPage={rowsPerPage}
//           setRowsPerPage={setRowsPerPage}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           totalPages={totalPages}
//         />
//       )}

//       {/* Modal for adding a new user */}
//       {isModalOpen && (
//         <div
//           id="modalBackdrop"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClickOutsideModal}
//         >
//           <AddNewUser onSubmit={handleUserFormSubmit} closeModal={closeModal} />
//         </div>
//       )}
//     </div>
//   );
// }

