import { useEffect, useState } from "react";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { getReferral } from "../../../service/apiReferral";

const tableHeaders = [
  "Requester Id",
  "Job Description",
  "Job Type",
  "Requestor",
  "Date Submitted",
  "Location",
  "Action",
];

export default function TableReferral() {
  const [tableData, setTableData] = useState([]); // Initialize as empty array
  const navigate = useNavigate();

  useEffect(() => {
    getReferral()
      .then((data) => {
        // Convert fetched data to table content format with sequential numbering
        const formattedData = data.map((row, index) => [
          `${index + 1}. ${row.requester_id}`, // Sequential numbering
          row.job_description || "",
          row.job_type || "",
          row.requestor_name || "",
          new Date(row.date_submitted).toLocaleDateString() || "",
          row.location || "",
          <ReusableViewButton
            key={row.referral_id} // Ensure each button has a unique key
            onClick={() =>
              navigate(`/department_head/referral/view/${row.referral_id}`)
            }
          />,
        ]);

        // Fill remaining rows with empty arrays if there are fewer than 10 rows
        const filledData = [
          ...formattedData,
          ...Array(Math.max(0, 10 - formattedData.length)).fill(
            Array(7).fill("")
          ),
        ];

        // Set table data with formatted content
        setTableData(filledData);
      })
      .catch((error) => console.error(error));
  }, [navigate]);

  return (
    <>
      <SearchBar title="Referral Table" showInput={true} />
      <Table
        columns={7} // Update to match the number of columns in your content
        rows={tableData.length}
        content={tableData}
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

// import { useEffect } from "react";
// import ReusableNextButton from "../../../components/ReusableNextButton";
// import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
// import ReusableViewButton from "../../../components/ReusableViewButton";
// import SearchBar from "../../../components/SearchBar";
// import Table from "../../../components/Table";
// import { useNavigate } from "react-router-dom";
// import { getReferral } from "../../../service/apiReferral";

// const tableHeaders = [
//   "Requester Id",
//   "Job Description",
//   "Job Type",
//   "Requestor",
//   "Date Submitted",
//   "Location",
//   "Action",
// ];

// export default function TableReferral() {
//   useEffect(() => {
//     getReferral()
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));
//   }, []);

//   // Or any other desired return value
//   const navigate = useNavigate();
//   const tableContent = [
//     [
//       "1. 20241",
//       "Broken Door",
//       "Carpenter",
//       "Cardo Dalisay",
//       "28 - 07 2024",
//       "CITC Building 3rd floor Room 309",
//       <>
//         <ReusableViewButton
//           onClick={() => navigate("/department_head/referral/view")}
//         />
//       </>,
//     ],
//     ["2."],
//     ["3."],
//     ["4."],
//     ["5."],
//     ["6."],
//     ["7."],
//     ["8."],
//     ["9."],
//     ["10."],
//   ];
//   return (
//     <>
//       <SearchBar title="Referral Table" showInput={true} />
//       <Table
//         columns={8}
//         rows={tableContent.length}
//         content={tableContent}
//         headers={tableHeaders}
//       />
//       <div className="flex items-center justify-between ml-4 mr-4 text-sm">
//         <div className="flex items-center space-x-2 ">
//           <label htmlFor="rows-per-page" className="text-gray-700 ">
//             Rows per page:
//           </label>
//           <select
//             id="rows-per-page"
//             className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 "
//           >
//             <option>10</option>
//             <option>20</option>
//             <option>30</option>
//             <option>40</option>
//           </select>
//         </div>
//         <div>
//           <ReusablePreviousButton />
//           <ReusableNextButton />
//         </div>
//       </div>
//     </>
//   );
// }
