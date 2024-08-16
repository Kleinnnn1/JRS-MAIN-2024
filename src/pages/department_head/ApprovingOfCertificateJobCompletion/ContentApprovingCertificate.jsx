import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ButtonApproveCertificate from "./ButtonApproveCertificate";
import ImageCertificate from "./ImageCertificate";

export default function ContentApprovingCertificate() {
  return (
    <>
      <SearchBar title={`Aprroving of Job Certificate Completion`} />
      <ReusableContent>
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
          <b>Prioritization: </b> High
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
        <br />
        <span>
          <b>Date of Job Started: </b> 01/08/2024
        </span>
        <br />
        <span>
          <b>Date of Job Finished: </b> 01/08/2024
        </span>
        <br />
        <span>
          <b>Certficate of Job Completion: </b> Certficate.pdf
        </span>
        <div className="absolute bottom-4 right-4 flex">
          <ReusableBackButton marginRight="mr-4" />
          <ButtonApproveCertificate />
        </div>
        <div className="absolute top-4 right-4 border border-black">
          <ImageCertificate />
        </div>
      </ReusableContent>
    </>
  );
}
