import SearchBar from "../../../components/SearchBar";
import ReusableContent from "../../../components/ReusableContent";
import ContentJobRequest from "./RequestorContentJobRequestDetail";

export default function RequestorJobRequestDetail() {
    return (
      <>
      <SearchBar title="Job Request Details" />

        <ContentJobRequest />
    </>
      );
}
