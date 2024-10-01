
import Table from "../components/table";
import ReusableViewButton from "../components/ReusableViewButon";
import ReusableSearchBar from "../components/ReusableSearchBar";
import { useNavigate } from "react-router-dom";



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
          onClick={() => navigate("/system_admin/Users/view_admin")}
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
     <ReusableSearchBar 
     onClick={() => navigate("/system_admin/Users/add_admin")}
     ButtonTitle="Add Admin"/>
      <Table
        columns={4}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
    
     </>
     
  );
}
