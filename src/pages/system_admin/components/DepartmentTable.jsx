
import 'remixicon/fonts/remixicon.css';
import Table from './table';
import { useNavigate } from "react-router-dom";
import ReusableViewButton from './ReusableViewButon';
import ButtonAddDepartment from '../Department/buttonAddDep';
import DepartmentHeader from '../Department/DeptHeader';



const tableHeaders = [
  "Department/Section",
  "Head",
  "Status",
  "Location",
  "Action",
];

export default function DeptTable() {
  const navigate = useNavigate();
  const tableContent = [
    [
      "1. Building And Grounds Maintenance Section",
      "Thomas Xxxxx",
      "Active",
      "Bldg 2",
     
      <>
        <ReusableViewButton 
          onClick={() => navigate("/")}
        />
      </>,
     ],
     [
        "2. Civil and Sanitary Works Section",
        "Engr. Balabis Xxxxx",
        "Active",
        "Bldg 5, Room 110",
       
        <>
          <ReusableViewButton 
            onClick={() => navigate("/")}
          />
        </>,
       ],
       [
        "3. Mechanical And Electrical Works Section",
        "Thomas Xxxxx",
        "Active",
        "DRER Right side",
       
        <>
          <ReusableViewButton 
            onClick={() => navigate("/system_admin/Departments/view")}
          />
        </>,
       ],
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
    <DepartmentHeader/>
     <ButtonAddDepartment
            onClick={() => navigate("/system_admin/Departments/add")}
         
          />
      <Table
        columns={5}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
     
     </>

    );}
      