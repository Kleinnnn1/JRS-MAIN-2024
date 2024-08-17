import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";

const tableHeaders = [
  "Requester Id",
  "Job Description",
  "Job Type",
  "Requestor",
  "Date Submitted",
  "Assigned to",
  "Location",
  "Prioritization",
  "Action",
];

export default function ContentJobOngoing() {
  const navigate = useNavigate();

  const tableContent = [
    [
      "1. 20241",
      "Broken Door",
      "Carpenter",
      "Cardo Dalisay",
      "28 - 07 2024",
      "John",
      "CITC Building 3rd floor Room 309",
      "High",
      <>
        <ReusableViewButton
          onClick={() => navigate("/department_head/job_ongoing/view")}
        />
      </>,
    ],
    ["2"],
    ["3"],
    ["4"],
    ["5"],
    ["6"],
    ["7"],
    ["8"],
    ["9"],
    ["10"],
  ];

  return (
    <>
      <SearchBar title="Job Ongoing" showInput={true} />
      <Table
        columns={9}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
      <div className="flex items-center justify-between ml-4 mr-4 text-sm">
        <div className="flex items-center space-x-2 ">
          <label htmlFor="rows-per-page" className="text-gray-700 ">
            Rows per page:
          </label>
          <select
            id="rows-per-page"
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 "
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
          </select>
        </div>
        <div>
          <ReusablePreviousButton />
          <ReusableNextButton />
        </div>
      </div>
    </>
  );
}
