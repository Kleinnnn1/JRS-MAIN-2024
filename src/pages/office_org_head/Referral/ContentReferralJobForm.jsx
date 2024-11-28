import ReusableAssignButton from "../../../components/ReusableAssignButton";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableRemarksButton from "../../../components/ReusableRemarksButton";

export default function ContentReferralJobForm() {
  return (
    <>
      <span>
        <b>Remarks:</b> We need you to clean the room first before we can fix
        the broken door knob in the CR.
      </span>
      <br />
      ----------------------------------------------------------------------
      <br />
      <span>
        <b>Requestor Name:</b> Ricardo Dalisay
      </span>
      <br />
      <span>
        <b>Job Description & Job Type: </b> Broken Door Knob : Carpenter
      </span>
      <br />
      <span>
        <b>Location: </b> CITC Building 3rd Floor Room - 309
      </span>
      <br />
      <span>
        <b>Image: </b>image.png
      </span>
      <br />
      <span>
        <b>Date Requested: </b> 01/08/2024
      </span>
      <br />
      ----------------------------------------
      <br />
      <span>
        <b>Staff Name: </b>
        <select>
          <option>Christian</option>
          <option>Leo</option>
          <option>Denzel</option>
        </select>
      </span>
      <br />
      <span>
        <b>Job Prioritization: </b>
        <select>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </span>
      <br />
      <span>
        <b>Estimated Time of Completion: </b>
        <input type="input" placeholder="1-2 Hours" />
      </span>
      <div className="absolute bottom-4 right-4 flex">
        <ReusableBackButton marginRight={`mr-4`} />
        <ReusableAssignButton marginRight={`mr-4`} />
        <ReusableRemarksButton />
      </div>
    </>
  );
}
