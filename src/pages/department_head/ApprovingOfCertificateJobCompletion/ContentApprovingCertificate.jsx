import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ButtonApproveCertificate from "./ButtonApproveCertificate";
import ImageCertificate from "./ImageCertificate";

export default function ContentApprovingCertificate() {
  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      {/* Search Bar */}
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Approving of Job Certificate Completion" />
      </div>

      {/* Content Section */}
      <ReusableContent>
        <div className="space-y-2">
          <div>
            <b>Requestor Name:</b> Ricardo Dalisay
          </div>
          <div>
            <b>Job Description & Job Type: </b> Broken Door Knob : Carpenter
          </div>
          <div>
            <b>Location: </b> CITC Building 3rd Floor Room - 309
          </div>
          <div>
            <b>Image: </b> image.png
          </div>
          <div>
            <b>Date Requested: </b> 01/08/2024
          </div>

          <hr className="my-4" />

          <div>
            <b>Staff Name: </b>
            <select className="ml-2 border rounded-md px-2 py-1">
              <option>Christian</option>
              <option>Leo</option>
              <option>Denzel</option>
            </select>
          </div>

          <div>
            <b>Prioritization: </b> High
          </div>

          <div>
            <b>Job Prioritization: </b>
            <select className="ml-2 border rounded-md px-2 py-1">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <b>Estimated Time of Completion: </b>
            <input
              type="text"
              className="ml-2 border rounded-md px-2 py-1"
              placeholder="1-2 Hours"
            />
          </div>

          <div>
            <b>Date of Job Started: </b> 01/08/2024
          </div>

          <div>
            <b>Date of Job Finished: </b> 01/08/2024
          </div>

          <div>
            <b>Certificate of Job Completion: </b> Certificate.pdf
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <ReusableBackButton />
          <ButtonApproveCertificate />
        </div>

        {/* Certificate Image */}
        <div className="absolute top-4 right-4">
          <ImageCertificate />
        </div>
      </ReusableContent>
    </div>
  );
}
