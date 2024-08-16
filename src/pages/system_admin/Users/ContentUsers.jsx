
import Table from "../components/table";
import { useNavigate } from "react-router-dom";
import ReusableViewButton from "../components/ReusableViewButon";



const tableHeaders = [
  "Employee ID",
  "Name",
  "JobTY",
  "Action",
];

export default function UserContent() {
  const navigate = useNavigate();
  const tableContent = [
    [
      "Building And Ground Maintenance Section",
      "Active",
      "Bldg 2",
     
      <>


        <ReusableViewButton 
          onClick={() => navigate("/")}
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
    ["11."],
    ["12."],
    ["13."],
    ["14."],
    ["15."],
  ];
  return (
    <>
     
      <Table
        columns={4}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
     
     </>
  );
}
