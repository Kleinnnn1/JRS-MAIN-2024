import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReferral } from "../../../service/apiReferral";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableViewButton from "../../../components/ReusableViewButton";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
  "Referral Id",
  "Job Description",
  "Job Type",
  "Requestor",
  "Date Submitted",
  "Location",
  "Action",
  "Image",
];

export default function TestTable() {
  const navigate = useNavigate();
  const { data: referral, error, isLoading } = useQuery({
    queryKey: ["referrals"],
    queryFn: getReferral,
    refetchInterval: 2000, // Polling interval for data refetch (10 seconds)
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Transform referral data to match the structure required by the Table
  const tableContent = referral.map((ref) => ({
    referralId: ref.id,
    jobDescription: ref.jobDescription,
    jobType: ref.jobType,
    requestor: ref.requestor,
    dateSubmitted: ref.dateSubmitted,
    location: ref.location,
    action: (
      <ReusableViewButton
        onClick={() => navigate(`/referral/${ref.id}/view`)}
      />
    ),
    image: <img src={ref.imageUrl} alt="Referral" className="w-12 h-12" />,
  }));

  // Filter the referral data based on the search term
  const filteredReferrals = tableContent.filter(
    (referral) =>
      referral.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.requestor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredReferrals.length / rowsPerPage);
  const paginatedReferrals = filteredReferrals.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      {/* Search Bar and Search Term */}
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Referral Records" />
        <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table */}
      <Table
        columns={tableHeaders.length}
        rows={paginatedReferrals.length}
        content={paginatedReferrals.map((ref, index) => [
          <span key={`referralId-${index}`}>{ref.referralId}</span>,
          <span key={`jobDescription-${index}`}>{ref.jobDescription}</span>,
          <span key={`jobType-${index}`}>{ref.jobType}</span>,
          <span key={`requestor-${index}`}>{ref.requestor}</span>,
          <span key={`dateSubmitted-${index}`}>{ref.dateSubmitted}</span>,
          <span key={`location-${index}`}>{ref.location}</span>,
          <div key={`action-${index}`} className="flex space-x-2">
            {ref.action}
          </div>,
          <span key={`image-${index}`}>{ref.image}</span>,
        ])}
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
    </div>
  );
}
