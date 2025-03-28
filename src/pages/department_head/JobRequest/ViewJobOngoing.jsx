  import ReusableBackButton from "../../../components/ReusableBackButton";
  import ReusableContent from "../../../components/ReusableContent";
  import SearchBar from "../../../components/SearchBar";

  export default function ViewJobOngoing() {
    return (
      <>
        <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
          <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
            <SearchBar title="Job Ongoing Information" />
          </div>
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
              <b>Prioritization: </b> High
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
              <ReusableBackButton />
            </div>

          </ReusableContent>
        </div>
      </>
    );
  }
