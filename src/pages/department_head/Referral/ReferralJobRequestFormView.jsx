import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ContentReferralJobForm from "./ContentReferralJobForm";

export default function ReferralJobRequestView() {
  return (
    <>
      <SearchBar title="Job Request Referral Form" />
      <ReusableContent>
        <ContentReferralJobForm />
      </ReusableContent>
    </>
  );
}
