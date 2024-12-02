import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import supabase from "../../../service/supabase"; // Ensure this is the correct path
import ReusableButton from "../../../components/ReusableButton.jsx"; // Import ReusableButton component

export default function RequestorCertificate() {
  const certificateRef = useRef();
  const [jobRequest, setJobRequest] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to manage loading UI

  // Fetch Job Requests from Supabase
  const fetchJobRequestData = async () => {
    try {
      const { data, error } = await supabase
        .from("Request")
        .select("*")
        .eq("status", "Completed");

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } else {
        const dataArray = Array.isArray(data) ? data : data ? [data] : [];
        setJobRequest(dataArray);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobRequestData();
  }, []);

  // React to Print Function
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  // Format Date for Display
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "Invalid Date" : parsedDate.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="container mx-auto">
      <ReusableButton onClick={handlePrint}>Print Certificate</ReusableButton>

      <div
        ref={certificateRef}
        className="p-10 bg-white max-w-3xl mx-auto border shadow-md mt-6"
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <img src="/path-to-ustp-logo.png" alt="USTP Logo" className="mx-auto w-24 h-24" />
          <h1 className="text-lg font-bold">UNIVERSITY OF SCIENCE AND TECHNOLOGY</h1>
          <h1 className="text-lg font-bold">OF SOUTHERN PHILIPPINES</h1>
          <p className="text-sm">Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon</p>
        </div>

        {/* Job Request Details */}
        <div className="border-t-2 border-b-2 py-4">
          <h2 className="text-center text-lg font-bold">JOB REQUEST FORM</h2>
          <table className="w-full border mt-4 text-left text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">ITEM NO.</th>
                <th className="border px-2 py-1">WORK DESCRIPTION</th>
                <th className="border px-2 py-1">LOCATION</th>
                <th className="border px-2 py-1">NO. OF PERSON</th>
                <th className="border px-2 py-1">REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {jobRequest.map((request, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{request.requestId}</td>
                  <td className="border px-2 py-1">{request.description}</td>
                  <td className="border px-2 py-1">{request.location}</td>
                  <td className="border px-2 py-1">{request.priority}</td>
                  <td className="border px-2 py-1">{request.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Request Information */}
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p>Requested by:</p>
              <p>{jobRequest[0]?.idNumber || "Not available"}</p>
            </div>
            <div>
              <p>Noted by:</p>
              <p>{jobRequest[0]?.extensionDate || "Not available"}</p>
            </div>
            <div>
              <p>Date Requested:</p>
              <p>{formatDate(jobRequest[0]?.requestDate)}</p>
            </div>
            <div>
              <p>Date Completed:</p>
              <p>{formatDate(jobRequest[0]?.dateCompleted)}</p>
            </div>
          </div>
        </div>

        {/* Certificate Section */}
        <div className="mt-6 text-center">
          <h2 className="text-lg font-bold">CERTIFICATE OF JOB COMPLETION</h2>
          <p className="mt-4 text-sm">
            THIS TO CERTIFY that the Job Request Form No.{" "}
            <span className="font-bold">{jobRequest[0]?.requestId}</span> requested by{" "}
            <span className="font-bold">{jobRequest[0]?.jobCategory}</span> was duly accomplished as
            of <span className="font-bold">{formatDate(jobRequest[0]?.dateCompleted)}</span>.
          </p>

          <p className="mt-6 text-sm">Issued this ______ day of ______________ at USTP, Cagayan De Oro.</p>

          {/* Signatories */}
          <div className="flex justify-between mt-12">
            <div className="text-left">
              <p>Allan T. Rodorocio</p>
              <p>MEWS - Unit Head</p>
            </div>
            <div className="text-left">
              <p>Confirmed:</p>
              <p>Requesting Official</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
