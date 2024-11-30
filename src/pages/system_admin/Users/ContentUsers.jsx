// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import Table from "../../../components/Table";
// import SearchBar from "../../../components/SearchBar";
// import supabase from "../../../service/supabase";
// import SysAdminAddNewUser from "./addUser";

// export default function UserContent() {
//   const navigate = useNavigate();

//   // States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [Requestors, setRequestors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch requestors from the backend
//   const fetchRequestors = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("Department")
//         .select(`
//           deptName,
//           User (
//             fullName,
//             birthDate,
//             userRole,
//             created_at
//           )
//         `);

//       if (error) throw error;

      // const formattedData = data.flatMap((department) =>
      //   department.User?.filter((user) => user.userRole === "requestor") // Guard for undefined `User`
      //     .map((head) => ({
      //       deptName: department.deptName,
      //       fullName: head.fullName,
      //       birthDate: new Date(head.birthDate).toLocaleDateString(),
      //       userRole: head.userRole,
      //     })) || []
      // );

//       setRequestors([...formattedData]); // Ensure a new reference for re-render
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching requestors:", error);
//       setLoading(false);
//     }
//   };

//   // UseEffect to fetch initial data and setup realtime subscription
//   useEffect(() => {
//     // Fetch initial data
//     fetchRequestors();

//     // Subscribe to realtime updates from the User table
//     const channel = supabase
//       .channel("public:User")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "User" },
//         async (payload) => {
//           console.log("Realtime event:", payload);
//           await fetchRequestors(); // Refresh data on any change
//         }
//       )
//       .subscribe();

//     // Cleanup subscription on component unmount
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const handleAddRequestor = () => setIsModalOpen(true);
//   const closeModal = async () => {
//     setIsModalOpen(false);
//     await fetchRequestors(); // Ensure data is refreshed after closing the modal
//   };
//   const handleClickOutsideModal = (e) => {
//     if (e.target.id === "modalBackdrop") closeModal();
//   };

//   // Filter Requestors based on search term
//   const filteredRequestors = Requestors.filter(
//     (requestor) =>
//       requestor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       requestor.deptName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       requestor.userRole?.toLowerCase().includes(searchTerm.toLowerCase())
//   ).sort((a, b) => a.fullName.localeCompare(b.fullName));

//   const totalPages = Math.ceil(filteredRequestors.length / rowsPerPage);
//   const paginatedRequestors = filteredRequestors.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Table content
//   const tableContent =
//     paginatedRequestors.length > 0
//       ? paginatedRequestors.map((requestor, index) => [
//           requestor.fullName,
//           requestor.deptName,
//           requestor.birthDate,
//           requestor.userRole,
//           <button
//             key={index}
//             onClick={() =>
//               navigate(`/system_admin/Users/view_requestor/${index}`)
//             }
//             className="text-blue-600 hover:text-blue-800"
//           >
//             View
//           </button>,
//         ])
//       : [[]];

//   const tableHeaders = [
//     "Full Name",
//     "Department",
//     "Birthday",
//     "User Role",
//     "Actions",
//   ];

//   return (
//     <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
//       {/* Header */}
//       <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
//         <SearchBar title="REQUESTOR" />
//         <div className="flex space-x-4">
//           <button
//             onClick={handleAddRequestor}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
//           >
//             Add New Requestor
//           </button>
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>
//       </header>

//       {/* Table */}
//       <Table
//         columns={5}
//         rows={paginatedRequestors.length}
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

//       {/* Modal */}
//       {isModalOpen && (
//         <div
//           id="modalBackdrop"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClickOutsideModal}
//         >
//           <SysAdminAddNewUser closeModal={closeModal} />
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import supabase from "../../../service/supabase";
import SysAdminAddNewUser from "./addUser";

export default function UserContent() {
  const navigate = useNavigate();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Requestors, setRequestors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requestor from the backend
  const fetchRequestors = async () => {
    try {
      const { data, error } = await supabase
        .from("User")
        .select(`
          id,
          fullName,
          userRole,
          created_at,
          Department (deptName)
        `)
        .in("userRole", ["requestor"]); // Only fetch relevant roles

      if (error) throw error;

      // Log the data for debugging purposes
      console.log("Fetched Data: ", data);

      // Ensure that data exists and format it correctly
      if (data && Array.isArray(data)) {
        const formattedData = data.map((user) => ({
          id: user.id,
          deptName: user.Department?.deptName || "N/A", // Handle missing deptName
          fullName: user.fullName,
          birthDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A", // Use created_at for birthdate if birthDate is missing
          jobCategory: user.userRole || "N/A", // Assuming jobCategory is the same as userRole for now, adjust if needed
        }));

        setRequestors(formattedData); // Set formatted data
      } else {
        console.error("Data is not an array or is undefined.");
        setRequestors([]); // Set an empty array in case of error
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching requestor:", error);
      setLoading(false);
    }
  };

  // UseEffect to fetch initial data and setup realtime subscription
  useEffect(() => {
    // Fetch initial data
    fetchRequestors();

    // Subscribe to realtime updates from the User table
    const channel = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        async (payload) => {
          console.log("Realtime event:", payload);
          await fetchRequestors(); // Refresh data on any change
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle modal visibility
  const handleAddRequestor = () => setIsModalOpen(true);
  const closeModal = async () => {
    setIsModalOpen(false);
    await fetchRequestors(); // Ensure data is refreshed after closing the modal
  };
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter Requestors based on search term
  const filteredRequestors = Requestors.filter(
    (requestor) =>
      requestor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requestor.deptName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requestor.jobCategory?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.fullName.localeCompare(b.fullName));

  const totalPages = Math.ceil(filteredRequestors.length / rowsPerPage);
  const paginatedRequestors = filteredRequestors.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table content
  const tableContent = paginatedRequestors.map((requestor) => [
    requestor.fullName,
    requestor.deptName,
    requestor.birthDate,
    requestor.jobCategory,
    <button
      key={requestor.id}
      onClick={() => navigate(`/system_admin/Users/view_user/${requestor.id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      View
    </button>,
  ]);

  const tableHeaders = [
    "Full Name",
    "Department",
    "Birthday",
    "Job Position",
    "Actions",
  ];

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="bg-custom-blue text-white p-4 rounded-lg flex justify-between items-center">
        <SearchBar title="Requestor" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddRequestor}
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={5}
          rows={paginatedRequestors.length}
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
          <SysAdminAddNewUser closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
