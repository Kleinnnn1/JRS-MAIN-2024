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
        navigate("/requestor/request_completed");
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

    // Add "Requestor confirmation" text at the bottom-left corner with smaller text
    const requestorTimestamp = `Requestor confirmation: ${new Date().toLocaleString()}`;
    ctx.font = "12px Arial"; // Smaller font size
    ctx.fillStyle = "red";  // Set text color to red
    ctx.textAlign = "left";  // Align text to the left

    // Draw the timestamp text near the bottom-left corner
    ctx.fillText(requestorTimestamp, 10, canvas.height - 10);  // 10 pixels from left and bottom

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
              Add Requestor Timestamp
            </button>
          </div>
        )
      )}
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import supabase from "../../../service/supabase"; // Adjust path
// import Swal from "sweetalert2"; // SweetAlert2 import

// export default function ViewCertificate() {
//   const { requestId } = useParams();
//   const navigate = useNavigate();
//   const [certificateUrl, setCertificateUrl] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCertificate();
//   }, [requestId]);

//   const fetchCertificate = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("Request")
//         .select("completedCertificate")
//         .eq("requestId", requestId)
//         .single();

//       if (error || !data?.completedCertificate) {
//         Swal.fire({
//           title: "Error!",
//           text: "Certificate not found.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         navigate("/requestor/request_completed");
//         return;
//       }

//       setCertificateUrl(data.completedCertificate);
//     } catch (err) {
//       console.error("Error fetching certificate:", err);
//       setError("Failed to load certificate.");
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to load certificate.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const loadImage = (src) =>
//     new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = "anonymous"; // Prevent CORS issue
//       img.onload = () => resolve(img);
//       img.onerror = (err) => reject(err);
//       img.src = src;
//     });

//   const addRequestorTimestampToImage = (image) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     // Set canvas size to match image size
//     canvas.width = image.width;
//     canvas.height = image.height;

//     // Draw the original image onto the canvas
//     ctx.drawImage(image, 0, 0);

//     // Add "Requestor confirmation" text at the bottom-left corner with smaller text
//     const requestorTimestamp = `Requestor confirmation: ${new Date().toLocaleString()}`;
//     ctx.font = "12px Arial"; // Smaller font size
//     ctx.fillStyle = "red"; // Set text color to red
//     ctx.textAlign = "left"; // Align text to the left

//     // Draw the timestamp text near the bottom-left corner
//     ctx.fillText(requestorTimestamp, 10, canvas.height - 10); // 10 pixels from left and bottom

//     return canvas;
//   };

//   const handleAddTimestamp = async () => {
//     if (!certificateUrl) return;

//     // Load the image and add the timestamp
//     const image = await loadImage(certificateUrl);
//     const canvas = addRequestorTimestampToImage(image);

//     // Convert canvas to a Blob (image file)
//     const dataUrl = canvas.toDataURL();
//     const blob = dataURLtoBlob(dataUrl);

//     // Specify the folder and file name to store inside the "certificate" folder
//     const fileName = `certificate/certificate_${requestId}.png`;  // Updated path

//     try {
//       // Upload the image to Supabase Storage (certificateJpeg bucket, inside the "certificate" folder)
//       const { data, error } = await supabase
//         .storage
//         .from("certificateJpeg") // Correct bucket
//         .upload(fileName, blob, { upsert: true });

//       if (error) {
//         console.error("Error uploading certificate to storage:", error);
//         Swal.fire({
//           title: "Error!",
//           text: "Failed to upload the certificate.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         return;
//       }

//       // Get the public URL of the uploaded image
//       const { publicURL } = supabase
//         .storage
//         .from("certificateJpeg")
//         .getPublicUrl(fileName);

//       // Update the completedCertificate column in the database
//       const { error: updateError } = await supabase
//         .from("Request")
//         .update({ completedCertificate: publicURL }) // Only update completedCertificate
//         .eq("requestId", requestId);

//       if (updateError) {
//         console.error("Error updating certificate URL in DB:", updateError);
//         Swal.fire({
//           title: "Error!",
//           text: "Failed to update the certificate URL.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         return;
//       }

//       setCertificateUrl(publicURL); // Update local state with new URL

//       // Show success message
//       Swal.fire({
//         title: "Success!",
//         text: "Certificate updated successfully with timestamp!",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => navigate(`/requestor/request_completed`)); // Redirect after confirmation
//     } catch (err) {
//       console.error("Error uploading new image:", err);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to upload the new image.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const dataURLtoBlob = (dataURL) => {
//     const [header, base64Data] = dataURL.split(",");
//     const mime = header.match(/:(.*?);/)[1];
//     const binary = atob(base64Data);
//     const len = binary.length;
//     const buffer = new ArrayBuffer(len);
//     const view = new Uint8Array(buffer);

//     for (let i = 0; i < len; i++) {
//       view[i] = binary.charCodeAt(i);
//     }

//     return new Blob([buffer], { type: mime });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-center text-xl font-bold mb-4">View Certificate</h1>
//       {error && <div className="text-red-500 text-center">{error}</div>}

//       {certificateUrl && (
//         <div className="flex flex-col items-center">
//           <img
//             src={certificateUrl}
//             alt="Certificate"
//             className="max-w-full border shadow-lg"
//           />
//           <button
//             onClick={handleAddTimestamp}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Mark as Job Completed
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
