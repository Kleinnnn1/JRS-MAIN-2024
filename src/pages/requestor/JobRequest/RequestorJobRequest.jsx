import iconFile from "../../../assets/images/iconFile.png"; 
import JobRequestTable from "./RequestorJobRequestTable";

export default function RequestorJobRequest() {
    return (
      <>
        <div className="my-4 mx-3 py-2 px-4 bg-blue-950 flex items-center min-h-20 shadow-md shadow-black/5 rounded-xl">
          <img src={iconFile} alt="Folder Icon" className="h-6 w-6 mr-4" /> 
          <h1 className="text-2xl font-bold text-white">Job Requests</h1>
        </div>
        
        <JobRequestTable />
      </>
    );
}
