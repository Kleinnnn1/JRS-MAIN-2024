
import Table from "../components/table";
import { useNavigate } from "react-router-dom";
import ReusableViewButton from "../components/ReusableViewButon";
import ReusableSearchBar from "../components/ReusableSearchBar";



const tableHeaders = [
  "Employee ID",
  "Name",
  "Designation",
  "Action",
];

export default function AdminContent() {
  const navigate = useNavigate();
  const tableContent = [
    [
      "1. 010101",
      "Cardo Dalisay",
      "Faculty",
     
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
     <ReusableSearchBar ButtonTitle="Add Admin"/>
      <Table
        columns={4}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
     
     </>
  );
}
