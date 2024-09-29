import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function RequestorCertificate() {
  const certificateRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  return (
    <div>
      {/* Button to trigger print */}
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Print Certificate
      </button>

      {/* Certificate layout */}
      <div ref={certificateRef} className="p-10 bg-white max-w-3xl mx-auto border shadow-md">
        <div className="text-center mb-6">
          <img src="/path-to-ustp-logo.png" alt="USTP Logo" className="mx-auto w-24 h-24" />
          <h1 className="text-lg font-bold">UNIVERSITY OF SCIENCE AND TECHNOLOGY</h1>
          <h1 className="text-lg font-bold">OF SOUTHERN PHILIPPINES</h1>
          <p className="text-sm">Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon</p>
        </div>

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
              <tr>
                <td className="border px-2 py-1">1</td>
                <td className="border px-2 py-1">Need to thoroughly clean the gym as soon as possible in preparation for today’s event.</td>
                <td className="border px-2 py-1">DRER GYM</td>
                <td className="border px-2 py-1">-</td>
                <td className="border px-2 py-1">The gym has been thoroughly cleaned as requested. Suggest setting up extra seating.</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p>Requested by:</p>
              <p>John Doe</p>
            </div>
            <div>
              <p>Noted by:</p>
              <p>MEWS - STAFF</p>
            </div>
            <div>
              <p>Date Requested:</p>
              <p>2025-05-26 12:00:00</p>
            </div>
            <div>
              <p>Date Completed:</p>
              <p>2025-05-26 12:00:00</p>
            </div>
          </div>
        </div>

        {/* Certificate Section */}
        <div className="mt-6 text-center">
          <h2 className="text-lg font-bold">CERTIFICATE OF JOB COMPLETION</h2>
          <p className="mt-4 text-sm">
            THIS TO CERTIFY that the Job Request Form No. <span className="font-bold">2024-151</span> requested by <span className="font-bold">John Doe</span> was duly accomplished as of <span className="font-bold">26-05-24</span>.
          </p>

          <p className="mt-6 text-sm">Issued this ______ day of ______________ at USTP, Cagayan De Oro.</p>

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
