import { useState } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { getDeptHeadJobRequest } from "../../../service/apiDeptHeadRequestTable";
import DeptHeadRequestData from "../../department_head/JobRequest/DeptHeadJobRequestData";
import ModalForm from "./ModalForm";

const tableHeaders = [
  "Requestor",
  "Job Description",
  "Job Position",
  "Date Submitted",
  "Location",
  "Image",
  "Priority",
  "Referral",
  "Action",
];

export default function ContentJobRequest() {
  const { data: request = [], error } = useQuery({
    queryKey: ["requests"],
    queryFn: getDeptHeadJobRequest,
  });

  // State for pagination, search, table data, and modal
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Function to open the modal with selected request
  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // Fetch data from DeptHeadRequestData component
  const tableContent = DeptHeadRequestData(request, openModal) || [];

  // Filter the table content based on the search term
  const filteredContent = tableContent.filter((request) => {
    const jobDescription = request[1] ? request[1].toLowerCase() : "";
    const jobType = request[2] ? request[2].toLowerCase() : "";
    const requestor = request[0] ? request[0].toLowerCase() : "";
    const location = request[4] ? request[4].toLowerCase() : "";

    return (
      jobDescription.includes(searchTerm.toLowerCase()) ||
      jobType.includes(searchTerm.toLowerCase()) ||
      requestor.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (error) {
    return (
      <p className="text-center text-red-500">Error fetching job requests</p>
    );
  }

  return (
    <>
      <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
        <div className="my-4 mx-3 py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
          <SearchBar title="Job Request" showInput={true} />
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Table */}
        {paginatedContent.length > 0 ? (
          <Table
            columns={tableHeaders.length}
            rows={paginatedContent.length}
            content={paginatedContent} // Use paginated content here
            headers={tableHeaders}
          />
        ) : (
          <p className="text-center text-gray-500">No job requests found</p>
        )}

        {/* Pagination */}
        <ReusablePagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />

        {/* Modal for assigning staff */}
        <ModalForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={() => console.log(selectedRequest)}
        />
      </div>
    </>
  );
}
