import SearchBar from "../../../components/SearchBar";
import HistoryCard from "./HistoryCard";
import { useNavigate } from "react-router-dom";

export default function ContenHistory() {
  const navigate = useNavigate();
  return (
    <>
      <SearchBar title="Job Request History" />
      <HistoryCard
        bgColor={`bg-blue-300`}
        title="Total of Finished Job Request"
        year={2024}
        count={41}
        onClick={() => navigate("/department_head/history/content")}
      />
    </>
  );
}
