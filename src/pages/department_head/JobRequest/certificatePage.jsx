import React, { useEffect, useState } from "react";
import supabase from "../../../service/supabase"; // Import your Supabase instance
import ViewCertificate from "../JobRequest/certificate"; // Import ViewCertificate component
import { useParams } from "react-router-dom";

export default function CertificatePage() {
  const { requestId } = useParams(); // Get requestId from URL params
  const [completedCertificate, setCompletedCertificate] = useState(""); // State for completedCertificate URL
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the `completedCertificate` from the Request table
  const fetchCompletedCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from("Request")
        .select("completedCertificate")
        .eq("requestId", requestId)
        .single();

      if (error) {
        console.error("Error fetching certificate status:", error);
      } else if (data) {
        setCompletedCertificate(data.completedCertificate); // Set the certificate URL
      }
      setLoading(false); // Stop loading
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedCertificate(); // Fetch on page load
  }, []);

  // Function to handle re-fetching after generating the certificate
  const handleCertificateGenerated = () => {
    fetchCompletedCertificate(); // Refetch to check for completedCertificate
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      {completedCertificate ? (
        // Display the uploaded certificate
        <>
          <div className="text-center">
            <img
              src={completedCertificate}
              alt="Completed Certificate"
              className="max-w-full mx-auto border shadow-md"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              // onClick={generateCertificate}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
              Sign Certificate
            </button>
          </div>
        </>
      ) : (
        // Render ViewCertificate if no completedCertificate exists
        <ViewCertificate onCertificateGenerated={handleCertificateGenerated} />
      )}
    </div>
  );
}
