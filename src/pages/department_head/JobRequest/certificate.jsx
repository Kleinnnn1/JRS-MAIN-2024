import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase"; // Adjust path

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

  // Convert canvas to a JPEG image (quality 0.92 is a good balance)
  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92);

  // Trigger the download
  const link = document.createElement("a");
  link.href = jpegDataUrl;
  link.download = `certificate_with_timestamp_${requestId}.jpg`; // Filename for download
  link.click(); // Programmatically click the link to start the download

  // Optionally, update the certificate URL (if you want to show the updated image after the download)
  setCertificateUrl(jpegDataUrl);
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
            <button
              onClick={handleAddTimestamp}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Department Head Timestamp
            </button>
          </div>
        )
      )}
    </div>
  );
}
