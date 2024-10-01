import { useNavigate, useOutlet, Outlet } from "react-router-dom";
import ReusableButton from "../../../components/ReusableButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";

const tableHeaders = [
  "Requester Id",
  "Job",
  "Staff Name",
  "Date Hired",
  "Schedule",
  "Status",
  "Action",
];

export default function TableEmployeeHistory() {
  const otherContent = useOutlet();
  const navigate = useNavigate();
  const tableContent = [
    [
      "1. 20241",
      "Carpenter",
      "Cardo Dalisay",
      "28 - 07 2024",
      "Monday to Saturday",
      "Active",
      <>
        <ReusableViewButton
          onClick={() => navigate("/department_head/employee/history/view")}
        />
      </>,
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
  ];
  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <>
          <SearchBar title="Employee History" showInput={true} name="view" />
          <Table
            columns={7}
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
