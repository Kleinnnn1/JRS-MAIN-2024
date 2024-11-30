import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ButtonHistory from "./ButtonHistory";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";
import ViewAddStaff from "./ViewAddEmployee"; // Import your form component
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth"; // Import the getCurrentUser function

export default function TableEmployee() {
  const navigate = useNavigate();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDeptId, setUserDeptId] = useState(null); // State to hold current user's deptId

  // Fetch employees from the User table where userRole is 'staff' and deptId matches
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // Get the current user's deptId
      const currentUser = await getCurrentUser();
      setUserDeptId(currentUser?.deptId); // Set the user's deptId
  
      // If the current user has a deptId, fetch employees matching that deptId
      if (currentUser?.deptId) {
        const { data, error } = await supabase
          .from("User")
          .select(`
            deptId,
            id,
            fullName,
            jobCategory,
            Department (deptName)
          `)
          .eq("userRole", "staff")
          .eq("deptId", currentUser.deptId); // Filter by deptId
  
        if (error) throw error;

        // Log the data for debugging purposes
        console.log("Fetched Data: ", data);

        // Ensure that data exists and format it correctly
        if (data && Array.isArray(data)) {
          const formattedData = data.map((user) => ({
            id: user.id,
            deptName: user.Department?.deptName || "N/A", // Handle missing deptName
            fullName: user.fullName,
            birthDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : "No Date Available", // Use created_at for birthdate if birthDate is missing
            jobCategory: user.jobCategory || "N/A", // Ensure jobCategory field exists
          }));
          
          setEmployees(formattedData); // Set the employees data
        }
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchEmployees();

    // Subscribe to realtime updates from the User table
    const channel = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        async (payload) => {
          console.log("Realtime event:", payload);
          await fetchEmployees(); // Refresh data on any change
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array to fetch data only on mount

  const handleAddEmployee = () => setIsModalOpen(true);
  const closeModal = async () => {
    setIsModalOpen(false);
    await fetchEmployees(); // Ensure data is refreshed after closing the modal
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter Employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobCategory?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table content
  const tableContent =
    paginatedEmployees.length > 0
      ? paginatedEmployees.map((employee, index) => [
          employee.fullName,
          employee.jobCategory,
          <div key={index} className="flex space-x-2">
            <button
      key={employee.id}
              onClick={() => navigate(`/department_head/employee/view/${employee.id}`)}
              className="text-white hover:text-blue-500 bg-blue-500 p-1 font-semibold rounded"
              >
                View
              </button>
          </div>,
        ])
      : [[]];

  const tableHeaders = ["Staff name", "Job Position", "Action"];

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Staff Records" />
        <div className="flex space-x-4">
          <button
            onClick={handleAddEmployee} // Open modal on button click
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Add New Staff
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={3} // Adjust columns count to 3 instead of 4 (since schedule is removed)
        rows={paginatedEmployees.length}
        content={tableContent}
        headers={tableHeaders}
      />

      {/* Pagination Component */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal for Add New Employee */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <ViewAddStaff closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}

// import React, { useState } from "react";
// import ReusableNextButton from "../../../components/ReusableNextButton";
// import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
// import ReusableViewButton from "../../../components/ReusableViewButton";
// import SearchBar from "../../../components/SearchBar";
// import Table from "../../../components/Table";
// import ButtonHistory from "./ButtonHistory";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ViewAddStaff from "./ViewAddEmployee"; // Import your form component

// const tableHeaders = [
//   "Staff name",
//   "Job Position",
//   "Staff Name",
//   "Schedule",
//   "Action",
// ];

// export default function TableEmployee() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

//   const tableContent = [
//     {
//       requesterId: "1. 20241",
//       job: "Carpenter",
//       staffName: "Cardo Dalisay",

//       schedule: "Monday to Saturday",
//     },
//     // Add more employee data here...
//   ];

//   // Filtering based on search term
//   const filteredEmployees = tableContent.filter(
//     (employee) =>
//       employee.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
//   const paginatedEmployees = filteredEmployees.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Modal component with round yellow close button outside
//   const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (
//       <div
//         className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
//         onClick={onClose}
//       >
//         <div
//           className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg"
//           onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-[-20px] right-[-20px] text-2xl bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-500"
//             aria-label="Close Modal"
//           >
//             ×
//           </button>

//           {/* Modal Content */}
//           <div className="p-4">{children}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
//       <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
//         <SearchBar title="Staff Records" />
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setIsModalOpen(true)} // Open modal on button click
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//           >
//             Add New Staff
//           </button>
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <Table
//         columns={7}
//         rows={paginatedEmployees.length}
//         content={paginatedEmployees.map((employee, index) => [
//           <span key={`requesterId-${index}`}>{employee.requesterId}</span>,
//           <span key={`job-${index}`}>{employee.job}</span>,
//           <span key={`staffName-${index}`}>{employee.staffName}</span>,
//           <span key={`schedule-${index}`}>{employee.schedule}</span>,
//           <div key={`action-${index}`} className="flex space-x-2">
//             <ReusableViewButton />
//             <ButtonHistory />
//           </div>,
//         ])}
//         headers={tableHeaders}
//       />

//       {/* Pagination Component */}
//       <ReusablePagination
//         rowsPerPage={rowsPerPage}
//         setRowsPerPage={setRowsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />

//       {/* Modal for Add New Employee */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ViewAddStaff />
//       </Modal>
//     </div>
//   );
// }
