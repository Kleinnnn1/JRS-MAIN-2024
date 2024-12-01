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
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth"; // Import the getCurrentUser function
import OfficeHeadViewAddStaff from "./ViewAddEmployee"; // Ensure the import is correct!

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
  const fetchEmployees = async (deptId) => {
    try {
      setLoading(true);
      
      // Fetch employees where deptId matches
      if (deptId) {
        const { data, error } = await supabase
          .from("User")
          .select(`
            deptId,
            id,
            fullName,
            jobCategory,
            Department (deptName)
          `)
          .eq("userRole", "requestor") // Change userRole to "staff"
          .eq("deptId", deptId); // Filter by deptId

        if (error) throw error;

        // Log the data for debugging purposes
        console.log("Fetched Data: ", data);

        // Ensure that data exists and format it correctly
        if (data && Array.isArray(data)) {
          const formattedData = data.map((user) => ({
            id: user.id,
            deptName: user.Department?.deptName || "N/A", // Handle missing deptName
            fullName: user.fullName,
            birthDate: user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "No Date Available", // Use created_at for birthdate if birthDate is missing
            jobCategory: user.jobCategory || "N/A", // Ensure jobCategory field exists
          }));

          console.log("Formatted Data: ", formattedData); // Log the formatted data

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
    const getUser = async () => {
      const currentUser = await getCurrentUser();
      setUserDeptId(currentUser?.deptId); // Set the user's deptId
      console.log("Current User: ", currentUser); // Log currentUser for debugging

      if (currentUser?.deptId) {
        fetchEmployees(currentUser.deptId); // Fetch employees after deptId is set
      }
    };

    getUser();

    // Subscribe to realtime updates from the User table (Optional)
    const channel = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        async (payload) => {
          console.log("Realtime event:", payload);
          await fetchEmployees(userDeptId); // Refresh data on any change
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array to fetch data only on mount

  const handleAddEmployee = () => {
    console.log('Add New Staff button clicked');
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    await fetchEmployees(userDeptId); // Ensure data is refreshed after closing the modal
  };

  const handleClickOutsideModal = (e) => {
    console.log("Clicked outside modal");
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
              onClick={() => navigate(`/office_head/staff/view/${employee.id}`)}
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
          <OfficeHeadViewAddStaff closeModal={closeModal} /> {/* Pass closeModal as prop */}
        </div>
      )}
    </div>
  );
}
