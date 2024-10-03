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
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="bg-custom-blue py-4 px-6 flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Job Completed Information" />
      </div>

      {/* Content Section */}
      <ReusableContent>
        <div className="space-y-4">
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
            <b>Image: </b> image.png
          </p>
          <p>
            <b>Date Requested: </b> 01/08/2024
          </p>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Job Details Section */}
        <div className="space-y-4">
          <p>
            <b>Staff Name: </b>
            <select className="ml-2 border rounded-md px-2 py-1">
              <option>Christian</option>
              <option>Leo</option>
              <option>Denzel</option>
            </select>
          </p>
          <p>
            <b>Job Prioritization: </b>
            <select className="ml-2 border rounded-md px-2 py-1">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </p>
          <p>
            <b>Estimated Time of Completion: </b>
            <input
              type="text"
              className="ml-2 border rounded-md px-2 py-1"
              placeholder="1-2 Hours"
            />
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <ReusableBackButton />
          <ReusableRemarksButton
            onClick={() => navigate("/department_head/job_request/remarks")}
          />
          <ReusableAssignButton onClick={handleClick} />
        </div>

        {/* Pop-up Message */}
        {showMessage && (
          <ReusablePopUpMessage
            message="Do you want to assign this job request to Leo?"
            onClose={handleClose}
          />
        )}
      </ReusableContent>
    </div>
  );
}
