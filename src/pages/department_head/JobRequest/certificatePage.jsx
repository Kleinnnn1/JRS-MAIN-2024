import React, { useEffect, useState } from "react";
import supabase from "../../../service/supabase";
import ViewCertificate from "../JobRequest/certificate";
import { useParams } from "react-router-dom";

export default function CertificatePage() {
  const { requestId } = useParams();
  const [completedCertificate, setCompletedCertificate] = useState("");
  const [loading, setLoading] = useState(true);
  const [deptHeadTimestamp, setDeptHeadTimestamp] = useState(null);
  const [error, setError] = useState(null);

  const fetchRequestData = async () => {
    try {
      const { data, error } = await supabase
        .from("Request")
        .select("completedCertificate, deptHeadTimestamp")
        .eq("requestId", requestId)
        .single();

      if (error) {
        setError(error);
        console.error("Error fetching request data:", error);
      } else {
        setCompletedCertificate(data.completedCertificate);
        setDeptHeadTimestamp(data.deptHeadTimestamp); // Corrected typo
      }
    } catch (err) {
      setError(err);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  const handleCertificateGenerated = () => {
    fetchRequestData(); // Refetch data after certificate generation
  };

  const handlePrint = () => {
    window.print(); // Print the current page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading certificate: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {completedCertificate && deptHeadTimestamp ? (
        <>
          <div id="certificate" className="text-center">
            <img
              src={completedCertificate}
              alt="Completed Certificate"
              className="max-w-full mx-auto border shadow-md"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Print Certificate
            </button>
          </div>
        </>
      ) : (
        <ViewCertificate onCertificateGenerated={handleCertificateGenerated} />
      )}
    </div>
  );
}
