import React from "react";
import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ButtonApproveCertificate from "./StaffButtonApproveCertificate";
import ImageCertificate from "./StaffImageCert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

export default function ContentApprovingCertificate() {
  const navigate = useNavigate();

  const handleSendCertificateClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to send the certificate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, send it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/staff/StaffSendCert/StaffCert");
      }
    });
  };

  return (
    <>
      <SearchBar title={`Send Certificate`} />
      <ReusableContent className="p-6 bg-white shadow-md rounded-lg">
        <span className="text-2xl font-bold mb-4 block">Job Details</span>

        <span className="block mb-2">
          <b>Requestor Name:</b> Ms. Charlanees Vallar
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
          <b>Date Finished:</b> 29 - 07 - 2024
        </span>
        <span className="block mb-2">
          <b>Prioritization:</b> High
        </span>

        <div className="block mb-2">
          <b>Duration: </b>
          <input
            type="text"
            placeholder="1-2 Hours"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="absolute bottom-5 right-4 flex">
          <ReusableBackButton marginRight="mr-4" />
          <ButtonApproveCertificate onClick={handleSendCertificateClick} />
        </div>

        <div className="absolute top-3 right-4 border border-black">
          <ImageCertificate />
        </div>
      </ReusableContent>
    </>
  );
}
