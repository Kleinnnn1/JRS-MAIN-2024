import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ReusablePopUpMessage from "../../../components/ReusablePopUpMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableAssignButton from "../../../components/ReusableAssignButton";
import ReusableRemarksButton from "../../../components/ReusableRemarksButton";

export default function ViewJobRequest() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
  };

  const handleClose = () => {
    setShowMessage(false);
  };

  return (
    <>
      <SearchBar title="Job Request Information" />
      <ReusableContent>
        <p>
          <b>Requestor Name:</b> Ricardo Dalisay
        </p>
        <p>
          <b>Job Description & Job Type: </b> Broken Door Knob : Carpenter
        </p>
        <p>
          <b>Location: </b> CITC Building 3rd Floor Room - 309
        </p>
        <p>
          <b>Image: </b>image.png
        </p>
        <p>
          <b>Date Requested: </b> 01/08/2024
        </p>
        <hr className="my-4" />
        <p>
          <b>Staff Name: </b>
          <select>
            <option>Christian</option>
            <option>Leo</option>
            <option>Denzel</option>
          </select>
        </p>
        <p>
          <b>Job Prioritization: </b>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </p>
        <p>
          <b>Estimated Time of Completion: </b>
          <input type="input" placeholder="1-2 Hours" />
        </p>
        <div className="absolute bottom-4 right-4 flex">
          <ReusableBackButton marginRight="mr-4" />
          <ReusableRemarksButton
            marginRight="mr-4"
            onClick={() => navigate("/department_head/job_request/remarks")}
          />
          <ReusableAssignButton onClick={handleClick} />
        </div>
        {showMessage && (
          <ReusablePopUpMessage
            message="Do you want to assign this job request to Leo?"
            onClose={handleClose}
          />
        )}
      </ReusableContent>
    </>
  );
}
