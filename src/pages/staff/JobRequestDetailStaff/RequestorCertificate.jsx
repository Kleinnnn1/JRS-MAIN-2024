import React, { useRef, useEffect, useState } from "react";
import supabase from "../../../service/supabase"; // Ensure this is the correct path
import ReusableButton from "../../../components/ReusableButton.jsx"; // Import ReusableButton component
import domToImage from "dom-to-image"; // Import dom-to-image for generating images
import { useParams } from "react-router-dom";

export default function RequestorCertificate() {
  const certificateRef = useRef();
  const [jobRequest, setJobRequest] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to manage loading UI
  const [staffTimestamp, setStaffTimestamp] = useState("");
  const [requestorTimestamp, setRequestorTimestamp] = useState("");
  const { requestId } = useParams();
  // Fetch Job Requests from Supabase
  const fetchJobRequestData = async () => {
    try {
      // Use the requestId from URL
      const { data: jobRequestData, error: jobRequestError } = await supabase
        .from("Request")
        .select("*")
        .eq("requestId", requestId);  // Use the dynamic requestId
  
      if (jobRequestError) {
        console.error("Error fetching job request data:", jobRequestError);
        setLoading(false);
        return;
      }
  
      if (jobRequestData.length === 0) {
        console.error("No job request data found");
        setLoading(false);
        return;
      }
  
      const request = jobRequestData[0];
  
      // Fetch the user data based on idNumber in the job request
      const { data: userData, error: userError } = await supabase
        .from("User")
        .select("id, idNumber, fName, lName")
        .eq("idNumber", request.idNumber);
  
      if (userError) {
        console.error("Error fetching user data:", userError);
        setLoading(false);
        return;
      }
  
      // Attach user data to the job request
      const requestWithUser = { ...request, user: userData[0] || {} };
      setJobRequest([requestWithUser]);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobRequestData();
  }, []);

  // Format Date for Display
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "Invalid Date" : parsedDate.toLocaleString();
  };

  // Function to generate and upload the JPEG
  const generateCertificate = async () => {
    const element = certificateRef.current;
  
    try {
      // Set timestamps immediately before generating the certificate
      const currentTimestamp = new Date().toLocaleString();
      setStaffTimestamp(currentTimestamp);  // Set the staff timestamp
      setRequestorTimestamp(currentTimestamp);  // Set the requestor timestamp
  
      // Wait for the DOM to render completely
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1000ms delay to ensure rendering
  
      // Ensure the certificate element has a defined height and width
      element.style.width = 'auto';
      element.style.height = 'auto';
      element.style.overflow = 'visible';
  
      // Generate a JPEG image from the certificate element
      const jpegBlob = await domToImage.toBlob(element);
  
      // Generate a valid file name
      const fileName = `certificates/${new Date().toISOString().replace(/[:.]/g, '-')}.jpeg`;
  
      // Upload the generated JPEG to Supabase Storage (certificateJpeg bucket)
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from("certificateJpeg")
        .upload(fileName, jpegBlob, {
          contentType: "image/jpeg",
          upsert: true,
        });
  
      if (storageError) {
        console.error("Error uploading JPEG:", storageError);
        return;
      }
  
      // Get the public URL of the uploaded JPEG
      const { data: urlData, error: urlError } = supabase
        .storage
        .from("certificateJpeg")
        .getPublicUrl(storageData?.path || storageData?.Key);
  
      if (urlError) {
        console.error("Error getting URL:", urlError);
        return;
      }
  
      // Update the completedCertificate column in the Request table with the JPEG URL
      const { error: updateError } = await supabase
        .from("Request")
        .update({ completedCertificate: urlData.publicUrl })
        .eq("requestId", requestId);
  
      if (updateError) {
        console.error("Error updating certificate URL:", updateError);
        return;
      }
  
      alert("Certificate generated and uploaded successfully!");
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="container mx-auto">
      <div
        ref={certificateRef}
        className="p-10 bg-white max-w-3xl mx-auto border shadow-md mt-6"
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold">UNIVERSITY OF SCIENCE AND TECHNOLOGY</h1>
          <h1 className="text-lg font-bold">OF SOUTHERN PHILIPPINES</h1>
          <p className="text-sm">Alubijid | Cagayan De Oro | Claveria | Jasaan | Oroquieta | Panaon</p>
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
                <th className="border px-2 py-1">PRIORITY</th>
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
            <span className="font-bold">
              {jobRequest[0]?.user?.fName || "Unknown"} {jobRequest[0]?.user?.lName || "User"}
            </span>{" "}
            was duly accomplished as
            of <span className="font-bold">{formatDate(jobRequest[0]?.dateCompleted)}</span>.
          </p>

          {/* Issued Date */}
          <p className="mt-6 text-sm">
            Issued this <span className="font-bold">{new Date().getDate()}</span> day of{" "}
            <span className="font-bold">
              {new Date().toLocaleString("default", { month: "long" })}
            </span>{" "}
            at USTP, Cagayan De Oro.
          </p>

          {/* Timestamps */}
          <p className="mt-4 text-sm">
            Staff Timestamp: <span className="font-bold">{staffTimestamp}</span>
          </p>
          <p className="mt-2 text-sm">
            Requestor Timestamp: <span className="font-bold">{}</span>
          </p>

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

          {/* Submit Certificate */}
          <div className="mt-8 text-center">
            <ReusableButton
              text="Mark as Job Completed"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={generateCertificate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
