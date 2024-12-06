import React from "react";
import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ReusableBackButton from "../../../components/ReusableBackButton";
import ButtonApproveCertificate from "./StaffButtonApproveCertificate";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function StaffJobDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract job details from navigation state
  const jobDetails = location.state || {
    requestorName: "N/A",
    jobDescription: "N/A",
    jobType: "N/A",
    location: "N/A",
    dateRequested: "N/A",
    dateStarted: "N/A",
    dateFinished: "N/A",
    priorityLevel: "N/A",
    duration: "N/A",
  };

  const handleSendCertificateClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to send the certificate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, send it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Certificate has been sent successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/staff/StaffSendCert");
        });
      }
    });
  };

  return (
    <>
      <SearchBar title="Job Details" />
      <ReusableContent className="p-6 bg-white shadow-md rounded-lg">
        <span className="text-2xl font-bold mb-4 block">Job Details</span>

        <span className="block mb-2">
          <b>Requestor Name:</b> {jobDetails.requestorName}
        </span>
        <span className="block mb-2">
          <b>Job Description:</b> {jobDetails.jobDescription}
        </span>
        <span className="block mb-2">
          <b>Job Type:</b> {jobDetails.jobType}
        </span>
        <span className="block mb-2">
          <b>Location:</b> {jobDetails.location}
        </span>
        <span className="block mb-2">
          <b>Date Requested:</b> {jobDetails.dateRequested}
        </span>
        <span className="block mb-2">
          <b>Date Started:</b> {jobDetails.dateStarted}
        </span>
        <span className="block mb-2">
          <b>Date Finished:</b> {jobDetails.dateFinished}
        </span>
        <span className="block mb-2">
          <b>Priority Level:</b> {jobDetails.priorityLevel}
        </span>
        <span className="block mb-2">
          <b>Duration:</b> {jobDetails.duration}
        </span>

        <div className="absolute bottom-5 right-4 flex">
          <ReusableBackButton marginRight="mr-4" />
          <ButtonApproveCertificate onClick={handleSendCertificateClick} />
        </div>
      </ReusableContent>
    </>
  );
}
