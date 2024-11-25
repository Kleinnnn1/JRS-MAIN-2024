
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Correctly imported useState
import Table from "../components/table";
import ReusableViewButton from "../components/ReusableViewButon"; // Corrected filename spelling
import ReusableSearchBar from "../components/ReusableSearchBar";
import AddNewUser from "./addUser";

export default function UserContent() {
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
     ButtonTitle="Add User"/>
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
          <AddNewUser closeModal={() => setIsModalOpen(false)} />
            
        </div>
      )}
    </>
  );s
}