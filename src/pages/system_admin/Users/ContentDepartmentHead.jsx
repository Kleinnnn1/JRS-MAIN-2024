
// import Table from "../components/table";
// import ReusableViewButton from "../components/ReusableViewButon";
// import ReusableSearchBar from "../components/ReusableSearchBar";
// import { useNavigate,useState} from "react-router-dom";
// import SysAdminAddNewAdmin from "./addNewAdmin";




// const tableHeaders = [
//   "Employee ID",
//   "Name",
//   "Designation",
//   "Action",
// ];

// export default function AdminContent() {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleMakeRequest = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);
//   const handleClickOutsideModal = (e) => {
//     if (e.target.id === "modalBackdrop") closeModal();
//   };

//   const handleJobRequestSubmit = () => {
//     // Handle new requests here if necessary
//     closeModal();
//   };



//   const tableContent = [
//     [
//       "1. 010101",
//       "Cardo Dalisay",
//       "Faculty",
     
//       <>


//         <ReusableViewButton 
//           onClick={() => navigate("/system_admin/Users/view_admin")}
//         />
       
        
//       </>,
//      ],
//     ["2."],
//     ["3."],
//     ["4."],
//     ["5."],
//     ["6."],
//     ["7."],
//     ["8."],
//     ["9."],
//     ["10."],
//     ["11."],
//     ["12."],
//     ["13."],
//     ["14."],
//     ["15."],
//   ];
//   return (
//     <>
//      <ReusableSearchBar 
//      onClick={() => navigate("/system_admin/Users/add_admin")}
//      ButtonTitle="Add Admin"/>
//       <Table
//         columns={4}
//         rows={tableContent.length}
//         content={tableContent}
//         headers={tableHeaders}
//       />
    
//     {isModalOpen && (
//         <div
//           id="modalBackdrop"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClickOutsideModal}
//         >
//           <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
//             <button
//               onClick={closeModal}
//               className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
//               aria-label="Close Modal"
//             >
//               &times;
//             </button>
//             {/* Render the form component and pass onSubmit handler */}
//             <SysAdminAddNewAdmin
//               onSubmit={handleJobRequestSubmit}
//               closeModal={closeModal}
//             />
//           </div>
//         </div>
//       )}




//      </>
     
//   );
// }

import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Correctly imported useState
import Table from "../components/table";
import ReusableViewButton from "../components/ReusableViewButon"; // Corrected filename spelling
import ReusableSearchBar from "../components/ReusableSearchBar";
import SysAdminAddNewAdmin from "./addNewAdmin"; // Ensure the path matches your file structure


export default function AdminContent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") setIsModalOpen(false);
  };

  const tableHeaders = ["Employee ID", "Name", "Designation", "Action"];
  const tableContent = [
    [
      "1. 010101",
      "Cardo Dalisay",
      "Faculty",
      <ReusableViewButton 
          onClick={() => navigate("/system_admin/Users/view_admin")}
        />,
    ],
    ["2."],
    ["3."],
    ["4."],
    ["5."],
    ["6."],
    ["7."],
    ["8."],
    ["9."],
    ["10."],
    ["11."],
    ["12."],
    ["13."],
    ["14."],
    ["15."],
  ];

  return (
    <>
      <ReusableSearchBar  onClick={() => setIsModalOpen(true)}
     ButtonTitle="Add Admin"/>
      <Table
        columns={4}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />

      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <SysAdminAddNewAdmin closeModal={() => setIsModalOpen(false)} />
            
        </div>
      )}
    </>
  );s
}