import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ImageView from "./StaffViewImage";
import ButtonApproveCertificate from "./StaffMarkComplete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ContentApprovingCertificate() {
  const navigate = useNavigate();

  const handleApproveClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to mark this as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as completed!",
      cancelButtonText: "No, keep it pending",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/staff/StaffSendCert");
      }
    });
  };

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
      <SearchBar title="View Image" />
      </div>
      <ReusableContent className="p-6 bg-white shadow-md rounded-lg relative">
        <span className="text-2xl font-bold mb-4 block">Job Details</span>

        <span className="block mb-2">
          <b>Requestor Name:</b> Ms. Charlane Vallar
        </span>

        <span className="block mb-2">
          <b>Job Description:</b> Broken Door Knob
        </span>

        <span className="block mb-2">
          <b>Job Type:</b> Carpentry
        </span>

        <span className="block mb-2">
          <b>Location:</b> 3rd floor ICT Building Room 309
        </span>

        <span className="block mb-2">
          <b>Date Requested:</b> 01/08/2024
        </span>

        <span className="block mb-2">
          <b>Date Started:</b> 28 - 07 - 2024
        </span>

        <span className="block mb-2">
          <b>Expected Accomplishment Date:</b> 29 - 07 - 2024
        </span>

        <span className="block mb-2">
          <b>Prioritization:</b> High
        </span>

        <div className="absolute bottom-5 right-4 flex">
          <ReusableBackButton marginRight="mr-4" />
          <ButtonApproveCertificate onClick={handleApproveClick} />
        </div>

        <div className="absolute top-4 right-4 border border-black w-full md:w-1/3">
          <ImageView />
        </div>
      </ReusableContent>
    </>
  );
}
