import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import SendFormButton from "./SendFormButtom";

export default function SendReportView() {
  return (
    <>
      <SearchBar title="Send Report Form" />
      <ReusableContent>
        <span>
          <b>Department Head:</b> Kenn Lou
        </span>
        <br />
        <span>
          <b>Report Letter: </b> Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Magni nesciunt optio quae qui similique reiciendis
          doloribus accusantium alias asperiores minima! Ab, eaque magni. Enim
          velit officiis aliquid laudantium quia facere?
        </span>
        <br />
        <span>
          <b>Department Head Signature: </b>
        </span>
        <br />
        <span>
          <b>Date: </b>01/08/2024
        </span>
        <div className="absolute bottom-4 right-4 flex">
          <ReusableBackButton />
          <SendFormButton />
        </div>
      </ReusableContent>
    </>
  );
}
