
import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Table from "../../../components/Table";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import { useNavigate } from "react-router-dom";
import ReusableViewButton from "../../../components/ReusableViewButton";
import ButtonAddDepartment from "../Department/buttonAddDep";
import SearchBar from "../../../components/SearchBar";
import toast from "react-hot-toast";
import { insertDepartment } from "../../../service/apiSysAdDepartments";
import { getDepartments } from "../../../service/apiSysAdDepartments";



const SysAdminAddDepartment = ({ closeModal, fetchDepartments }) => {
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!departmentName) {
      toast.error("Department name is required");
      return;
    }

    try {
      const newDepartment = { deptName: departmentName };
      await insertDepartment(newDepartment);

      toast.success("Department added successfully");
      setDepartmentName("");
      fetchDepartments();  // Refresh department list after adding
      closeModal();
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 max-w-2xl relative">
        <button
          onClick={closeModal}
          className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
          aria-label="Close Modal"
        >
          &times;
        </button>
        <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded-lg relative">
          Add Department
        </header>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="text-gray-700 font-bold mb-10"
              htmlFor="departmentName"
            >
              Department Name
            </label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeptTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeaders = ["Department Name", "Department/Office Head", "Action"];

  // Function to fetch departments
  const fetchDepartments = async () => {
    try {
      const fetchedDepartments = await getDepartments();
      setDepartments(fetchedDepartments);
    } catch (error) {
      toast.error("Error fetching departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter(
    (department) =>
      department.deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.deptHead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const tableContent =
    paginatedDepartments.length > 0
      ? paginatedDepartments.map((department, index) => [
          department.deptName,
          department.deptHead,
          <ReusableViewButton key={department.id} id={department.id} />,
        ])
      : [[]];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <SearchBar title="Departments" />
        <div className="flex space-x-4">
          <ButtonAddDepartment onClick={handleOpenModal} />
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>
      <Table
        columns={5}
        rows={paginatedDepartments.length}
        content={tableContent}
        headers={tableHeaders}
      />
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {isModalOpen && <SysAdminAddDepartment closeModal={handleCloseModal} fetchDepartments={fetchDepartments} />}
    </div>
  );
};

export default DeptTable;