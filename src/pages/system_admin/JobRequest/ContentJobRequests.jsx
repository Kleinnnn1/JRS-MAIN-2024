
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../components/ReusableDropdown";
import ReusableViewButton from "../components/ReusableViewButon";
import ReusableSearchBar from "../components/ReusableSearchBar";

const options = [
  { value: "1", label: "CSWS" },
  { value: "2", label: "MEWS" },
  { value: "3", label: "BGMS" },
];

const tableHeaders = [
  "Requester Id",
  "Job Description",
  "Job Type",
  "Requestor",
  "Date Submitted",
  "Location",
  "Action",
];

export default function ContentJobRequest() {
  const navigate = useNavigate();
  const tableContent = [
    [
      "1. 20241",
      "Broken Door",
      "Carpenter",
      "Cardo Dalisay",
      "28 - 07 2024",
      "CITC Building 3rd floor Room 309",
      <>


        <ReusableViewButton 
          onClick={() => navigate("/")}
        />
        <DropdownButton options={options} />
        
      </>,
    ],

  ];
  return (
    <>
    <ReusableSearchBar onClick={() => navigate("/system_admin/Job_Requests/new_request")}
      ButtonTitle="New Request"/>
     
      <Table
        columns={7}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
     
     </>
  );
}
