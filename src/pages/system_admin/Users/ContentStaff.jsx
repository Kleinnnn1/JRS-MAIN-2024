import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "../components/table";
import ReusableViewButton from "../components/ReusableViewButon";
import ReusableSearchBar from "../components/ReusableSearchBar";
import SysAdminAddNewStaff from "./addNewStaff";

export default function StaffContent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal handler
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  const tableHeaders = ["Employee ID", "Name", "Job Position", "Action"];
  const tableContent = [
    [
      "1. 010101",
      "Cardo Dalisay",
      "Faculty",
      <ReusableViewButton
        onClick={() => navigate("/system_admin/Users/view_staff")}
      />,
    ],
    [
      "2. 010102",
      "John Doe",
      "Staff",
      <ReusableViewButton
        onClick={() => navigate("/system_admin/Users/view_staff")}
      />,
    ],
    [
      "3. 010103",
      "Jane Smith",
      "Faculty",
      <ReusableViewButton
        onClick={() => navigate("/system_admin/Users/view_staff")}
      />,
    ],
    // Add more rows as needed with consistent 4 columns
    ["4.", "Name", "Designation", <ReusableViewButton />],
    ["5.", "Name", "Designation", <ReusableViewButton />],
    // ... other rows
  ];

  return (
    <>
      <ReusableSearchBar
        onClick={() => setIsModalOpen(true)}
        ButtonTitle="Add Staff"
      />
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
          <SysAdminAddNewStaff closeModal={closeModal} />
        </div>
      )}
    </>
  );
}
