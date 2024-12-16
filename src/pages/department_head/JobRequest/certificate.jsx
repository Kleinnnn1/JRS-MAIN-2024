import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase"; // Adjust path
import { jsPDF } from "jspdf"; // Import jsPDF

export default function ViewCertificate() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, [requestId]);

  const fetchCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from("Request")
        .select("completedCertificate")
        .eq("requestId", requestId)
        .single();

      if (error || !data?.completedCertificate) {
        alert("Certificate not found.");
        navigate("/department_head/job_completed");
        return;
      }

      setCertificateUrl(data.completedCertificate);
    } catch (err) {
      console.error("Error fetching certificate:", err);
      setError("Failed to load certificate.");
    } finally {
      setLoading(false);
    }
  };

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Prevent CORS issue
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });

  const addRequestorTimestampToImage = (image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match image size
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the original image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Add "Requestor confirmation" text at the bottom-right corner
    const requestorTimestamp = `Department head confirmation: ${new Date().toLocaleString()}`;
    ctx.font = "12px Arial"; // Smaller font size
    ctx.fillStyle = "red";  // Set text color to red
    ctx.textAlign = "right";  // Align text to the right

    // Draw the timestamp text near the bottom-right corner
    ctx.fillText(requestorTimestamp, canvas.width - 10, canvas.height - 10);  // 10 pixels from right and bottom

    return canvas;
  };

  const handleAddTimestamp = async () => {
    if (!certificateUrl) return;

    const image = await loadImage(certificateUrl);
    const canvas = addRequestorTimestampToImage(image);

    // Convert canvas to an image URL
    const newImageUrl = canvas.toDataURL();

    // Upload the new image to the database
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("Request")
        .update({ completedCertificate: newImageUrl }) // Update the image in the database
        .eq("requestId", requestId);

      if (error) {
        console.error("Error updating certificate in DB:", error);
        setError("Failed to update certificate in database.");
        return;
      }

      // Update the local state with the new image URL
      setCertificateUrl(newImageUrl);
      alert("Certificate updated successfully with timestamp!");
    } catch (err) {
      console.error("Error uploading new image:", err);
      setError("Failed to upload the new image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!certificateUrl) return;
  
    // Load the image to convert to PDF
    const image = await loadImage(certificateUrl);
  
    // Initialize jsPDF
    const doc = new jsPDF();
  
    // Get the PDF's width and height
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
  
    // Calculate the image's position to center it
    const imgWidth = 180; // Adjust image width as needed
    const imgHeight = (image.height * imgWidth) / image.width; // Maintain aspect ratio
  
    const xPos = (pdfWidth - imgWidth) / 2; // Center horizontally
    const yPos = (pdfHeight - imgHeight) / 2; // Center vertically
  
    // Add the image to the PDF at the calculated position
    doc.addImage(image, "JPEG", xPos, yPos, imgWidth, imgHeight);
  
    // Save the PDF with a dynamic file name
    doc.save(`certificate_with_timestamp_${requestId}.pdf`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mb-4">View Certificate</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        certificateUrl && (
          <div className="flex flex-col items-center">
            <img
              src={certificateUrl}
              alt="Certificate"
              className="max-w-full border shadow-lg"
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={handleAddTimestamp}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
              >
                Add Department Head Timestamp
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Download Certificate
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
