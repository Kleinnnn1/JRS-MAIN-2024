import SearchBar from "../../../components/SearchBar";
import ReusableContent from "../../../components/ReusableContent";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableSendButton from "../../../components/ReusableSendButton";

export default function ViewJobRequestRemarks() {
  return (
    <>
      <SearchBar title="Remarks" />
      <ReusableContent>
        <span>
          <b>Message from department head: </b> We currently lack the materials
          to fix the broken tiles
        </span>
        <br />
        ---------------------------------------------------------------------------
        <br />
        <span>
          <b>Requestor: </b> Ricardo Dalisay
        </span>
        <br />
        <span>
          <b>Job Desription: </b> Broken tiles in ICT building 1st floor
        </span>
        <br />
        <span>
          <b>Job Type: </b> Tile installer
        </span>
        <br />
        <span>
          <b>Location: </b> ICT Building 1st floor
        </span>
        <br />
        <span>
          <b>Date Requested: </b> 01/08/2024
        </span>
        <div className="absolute bottom-4 right-4 flex">
          <ReusableBackButton marginRight={`mr-4`} />
          <ReusableSendButton />
        </div>
      </ReusableContent>
    </>
  );
}
