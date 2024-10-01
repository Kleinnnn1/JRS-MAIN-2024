import { useQuery } from "@tanstack/react-query";
import { getReferral } from "../../../service/apiReferral";
import Table from "../../../components/Table";
import TableData from "./TableData"; // Import the transform function
import SearchBar from "../../../components/SearchBar";

const tableHeaders = [
  "Referral Id",
  "Job Description",
  "Job Type",
  "Requestor",
  "Date Submitted",
  "Location",
  "Action",
  "Image",
];

export default function TestTable() {
  const { data: referral, error } = useQuery({
    queryKey: ["referrals"],
    queryFn: getReferral,
    refetchInterval: 2000, // Polling interval for data refetch (10 seconds)
  });

  // Transform the referral data into the format required by Table
  const tableContent = TableData(referral);

  if (error) return <div>Error loading data</div>;

  return (
    <>
      <SearchBar title="Referral" />
      <Table
        columns={tableHeaders.length}
        rows={tableContent.length}
        content={tableContent}
        headers={tableHeaders}
      />
    </>
  );
}
