import SearchBar from "../../../components/SearchBar";
import HistoryCard from "./HistoryCard";
import { useNavigate } from "react-router-dom";

export default function ContenHistory() {
  const navigate = useNavigate();
  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Job Request History" />
      </div>
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
