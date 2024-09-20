import { useNavigate } from "react-router-dom";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";

const tableHeaders = [
  "Job Description",
  "Job Type",
  "Date Started",
  "Date Finished",
  "Location",
  "Priority Level",
  "Duration",
  "Action",
];

export default function TableCertificate() {
  const navigate = useNavigate();
  const tableContent = [
    [
      "Broken Door",
      "Carpenter",
      "28 - 07 - 2024",
      "28 - 08 - 2024",
      "3rd floor ICT Building Room 309",
      "High",
      "2 hours",
      <>
        <ReusableViewButton
          onClick={() =>
            navigate("/staff/StaffSendCert/StaffCert")
          }
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
  ];
  return (
    <>
      <SearchBar
        title="Send Certificate "
        showInput={true}
      />
      <Table
        columns={8}
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
