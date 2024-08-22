import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
  "Task ID",
  "Job Description",
  "Requestor",
  "Location",
  "Date Started",
  "Accomplished Date",
  "Status",
  "Action",
  
];

export default function JobCompletedContent() {
  const navigate = useNavigate();
  const tableContent = [
    [
        " ", 
      "Broken Door Knob",
      "Ms. Charlane Vallar",
      "CITC Building",
      "28 - 07 - 2024",
      "30 - 07 - 2024",
      "Completed",
      <>
        <ReusableViewButton
          onClick={() => navigate("/department_head/job_completed/view")}
        />
      
      </>,
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  return (
    <>
      <SearchBar title="History" showInput={true} />
      <Table
        columns={8}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
      <div className="flex items-center justify-center ml-4 mr-4 text-sm">
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
