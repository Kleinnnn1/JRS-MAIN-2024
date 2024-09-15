import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableNextButton from "../../../components/ReusableNextButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";
import ReusableButton from "../../../components/ReusableButton";

const tableHeaders = [
  "Requester Id",
  "Job Description",
  "Job Type",
  "Date Finished",
  "Assigned to",
  "Location",
  "Estimimated Time",
  "Action",
];

export default function TableHistory() {
  const navigate = useNavigate();
  const otherContent = useOutlet();
  const tableContent = [
    [
      "1. 20241",
      "Broken Door",
      "Carpenter",
      "28 - 07 - 2024",
      "John",
      "3rd floor ICT Building Room 309",
      "2-3 hours",
      <>
        <ReusableViewButton
          onClick={() =>
            navigate("/department_head/history/content/information")
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
    [],
  ];
  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <>
          <SearchBar title="Job Request History 2024" showInput={true} />
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
              <ReusableButton
                border={`border border-black`}
                onClick={() => navigate(-1)}
              >
                Back
              </ReusableButton>
              <ReusablePreviousButton />
              <ReusableNextButton />
            </div>
          </div>
        </>
      )}
    </>
  );
}
