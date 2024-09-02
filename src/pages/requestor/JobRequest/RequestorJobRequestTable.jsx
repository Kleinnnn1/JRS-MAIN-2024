import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import iconFile from "../../../assets/images/iconFile.png";

const tableHeaders = [
  "Request ID",
  "Requestor",
  "Work Description",
  "Job Category",
  "No. of Person",
  "Department",
  "Processed by",
  "Status",
  "Date Requested",
  "Date Completed",
  "Actions",
];

const tableContent = [
  [
    "1",
    "John Doe",
    "The aircon does not work",
    "Maintenance",
    "-",
    "CISWS",
    "CISWS",
    <>
      <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">Pending</span>
    </>,
    "28 - 07 - 2024",
    "-",
    <>
          <button
            onClick={() => navigate("/requestor/job_request_detail")}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            View
          </button>
    </>
  ],
  // Add more rows as needed
];

export default function RequestorJobRequestTable() {
  const navigate = useNavigate();

  return (
    <>
      <div className="my-4 mx-3 py-2 px-4 bg-blue-950 flex items-center justify-between shadow-md shadow-black/5 rounded-xl">
        <div className="flex items-center">
          <img src={iconFile} alt="Folder Icon" className="h-6 w-6 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-white">Job Requests</h1>
            <p className="text-sm text-white">May 26, 2024 Sunday</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Make Request
          </button>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button className="bg-yellow-500 text-white px-4 py-2">
              Search
            </button>
          </div>
        </div>
      </div>

      <Table
        columns={tableHeaders.length}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
        className="m-4"
      />

      <div className="flex items-center justify-between p-4 text-sm">
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className="text-gray-700">Rows per page:</label>
          <select
            id="rows-per-page"
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-700"
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
          </select>
        </div>
        <div>
          <button className="px-4 py-2 text-gray-700">&lt;</button>
          <span className="mx-2">0 - 0 of 0</span>
          <button className="px-4 py-2 text-gray-700">&gt;</button>
        </div>
      </div>
    </>
  );
}
