import SearchBar from "../../../components/SearchBar";
import ContentJobRequest from "./RequestorContentJobRequestDetail";

export default function RequestorJobRequestDetail() {
  return (
    <>
      <div className="my-4 mx-3 py-2 px-4 bg-custom-blue flex items-center min-h-20 shadow-md shadow-black/5 rounded-xl">
        <SearchBar title="Specific Record" />
      </div>

      <ContentJobRequest />
    </>
  );
}
