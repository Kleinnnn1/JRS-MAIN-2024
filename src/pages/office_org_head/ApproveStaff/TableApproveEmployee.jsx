import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";
import supabase from "../../../service/supabase";
import toast from "react-hot-toast";
import { getCurrentUser } from "../../../service/apiAuth"; // Import getCurrentUser

const tableHeaders = [
  "Full Name",
  "Employee ID",
  "Birth Date", // Changed from "User Role" to "Birth Date"
  "Email",
  "Action",
];

export default function TableApproveEmployee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [userDeptId, setUserDeptId] = useState(null);

  useEffect(() => {
    const fetchUserAndEmployees = async () => {
      try {
        // Get current user
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUserDeptId(currentUser.deptId); // Set deptId from current user

          // Fetch employees filtered by department and unverified role
          const { data, error } = await supabase
            .from("User")
            .select("idNumber, birthDate, fullName, email, deptId") // Fetch birthDate instead of userRole
            .eq("userRole", "unverified")
            .eq("deptId", currentUser.deptId); // Match the current user's deptId

          if (error) {
            console.error("Error fetching employees:", error);
          } else {
            setEmployees(data || []);
          }
        }
      } catch (err) {
        console.error("Error fetching user or employees:", err);
      }
    };

    fetchUserAndEmployees();
  }, []);

  const handleAction = async (idNumber, action) => {
    try {
      if (action === "approve") {
        const { data: updatedData, error } = await supabase
          .from("User")
          .update({ userRole: "requestor" })
          .eq("idNumber", idNumber)
          .select("*");

        if (error) {
          toast.error("Error approving the employee.");
          console.error("Error updating userRole:", error);
          return;
        }

        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.idNumber === idNumber
              ? { ...employee, userRole: "requestor" }
              : employee
          )
        );

        toast.success("Employee approved successfully!");
      } else if (action === "decline") {
        const { error } = await supabase
          .from("User")
          .delete()
          .eq("idNumber", idNumber); // Delete the user by idNumber

        if (error) {
          toast.error("Error deleting the employee.");
          console.error("Error deleting user:", error);
          return;
        }

        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.idNumber !== idNumber)
        ); // Remove the declined employee from the state

        toast.success("Employee declined and deleted successfully!");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error("Error handling action:", err);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.fullName} ${employee.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex flex-col sm:flex-row justify-between items-center rounded-t-lg">
        <SearchBar title="Staff Approval" />
        <div className="flex flex-col sm:flex-row sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          content={
            paginatedEmployees.length > 0
              ? paginatedEmployees.map((employee, index) => [
                  <span key={`fullName-${index}`}>{employee.fullName}</span>,
                  <span key={`idNumber-${index}`}>{employee.idNumber}</span>,
                  <span key={`birthDate-${index}`}>{employee.birthDate}</span>,

                  <span key={`email-${index}`}>{employee.email}</span>,
                  <span
                    key={`action-${index}`}
                    className="flex justify-left items-center space-x-4"
                  >
                    <button
                      type="button"
                      className="bg-green-500 px-4 py-2 font-bold rounded text-white"
                      onClick={() => handleAction(employee.idNumber, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 px-4 py-2 font-bold rounded text-white"
                      onClick={() => handleAction(employee.idNumber, "decline")}
                    >
                      Decline
                    </button>
                  </span>,
                ])
              : [[]]
          }
          headers={tableHeaders}
        />
      </div>

      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import SearchBar from "../../../components/SearchBar";
// import Table from "../../../components/Table";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import ReusablePagination from "../../../components/ReusablePagination";
// import supabase from "../../../service/supabase";
// import toast from "react-hot-toast";
// import { getCurrentUser } from "../../../service/apiAuth"; // Import getCurrentUser

// const tableHeaders = [
//   "Employee ID",
//   "User Role",
//   "Full Name",
//   "Email",
//   "Action",
// ];

// export default function TableApproveEmployee() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [employees, setEmployees] = useState([]);
//   const [userDeptId, setUserDeptId] = useState(null);

//   useEffect(() => {
//     const fetchUserAndEmployees = async () => {
//       try {
//         // Get current user
//         const currentUser = await getCurrentUser();
//         if (currentUser) {
//           setUserDeptId(currentUser.deptId); // Set deptId from current user

//           // Fetch employees filtered by department and unverified role
//           const { data, error } = await supabase
//             .from("User")
//             .select("idNumber, userRole, fullName, email, deptId")
//             .eq("userRole", "unverified")
//             .eq("deptId", currentUser.deptId); // Match the current user's deptId

//           if (error) {
//             console.error("Error fetching employees:", error);
//           } else {
//             setEmployees(data || []);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching user or employees:", err);
//       }
//     };

//     fetchUserAndEmployees();
//   }, []);

//   const handleAction = async (idNumber, action) => {
//     try {
//       if (action === "approve") {
//         const { data: updatedData, error } = await supabase
//           .from("User")
//           .update({ userRole: "requestor" })
//           .eq("idNumber", idNumber)
//           .select("*");

//         if (error) {
//           toast.error("Error approving the employee.");
//           console.error("Error updating userRole:", error);
//           return;
//         }

//         setEmployees((prevEmployees) =>
//           prevEmployees.map((employee) =>
//             employee.idNumber === idNumber
//               ? { ...employee, userRole: "requestor" }
//               : employee
//           )
//         );

//         toast.success("Employee approved successfully!");
//       } else if (action === "decline") {
//         toast.info("Decline action clicked. Implement as needed.");
//       }
//     } catch (err) {
//       toast.error("An unexpected error occurred.");
//       console.error("Error handling action:", err);
//     }
//   };

//   const filteredEmployees = employees.filter((employee) =>
//     `${employee.fullName} ${employee.email}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
//   const paginatedEmployees = filteredEmployees.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
//       <div className="bg-custom-blue py-2 px-4 flex flex-col sm:flex-row justify-between items-center rounded-t-lg">
//         <SearchBar title="Staff Approval" />
//         <div className="flex flex-col sm:flex-row sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <Table
//           content={
//             paginatedEmployees.length > 0
//               ? paginatedEmployees.map((employee, index) => [
//                   <span key={`idNumber-${index}`}>{employee.idNumber}</span>,
//                   <span key={`userRole-${index}`}>{employee.userRole}</span>,
//                   <span key={`fullName-${index}`}>{employee.fullName}</span>,
//                   <span key={`email-${index}`}>{employee.email}</span>,
//                   <span
//                     key={`action-${index}`}
//                     className="flex justify-left items-center space-x-4"
//                   >
//                     <button
//                       type="button"
//                       className="bg-green-500 px-4 py-2 font-bold rounded text-white"
//                       onClick={() => handleAction(employee.idNumber, "approve")}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       type="button"
//                       className="bg-red-500 px-4 py-2 font-bold rounded text-white"
//                       onClick={() => handleAction(employee.idNumber, "decline")}
//                     >
//                       Decline
//                     </button>
//                   </span>,
//                 ])
//               : [[]]
//           }
//           headers={tableHeaders}
//         />
//       </div>

//       <ReusablePagination
//         rowsPerPage={rowsPerPage}
//         setRowsPerPage={setRowsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />
//     </div>
//   );
// }
