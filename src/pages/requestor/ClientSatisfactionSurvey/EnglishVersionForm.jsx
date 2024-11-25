import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUSTP from "../../../assets/images/logoUSTP.png";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // Import xlsx library

const EnglishVersionForm = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(1);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        clientType: "Citizen", 
        role: "",  
        sex: "",  
        age: "", 
        region: "Region X",
        campus: "Cagayan de Oro",
        transactedOffice: "",
        serviceAvailed: "",
        ccAwareness: "",
        ccVisibility: "",
        ccHelp: "",
        SQD0: "",
        SQD1: "",
        SQD2: "",
        SQD3: "",
        SQD4: "",
        SQD5: "",
        SQD6: "",
        SQD7: "",
        SQD8: "",
        comments: "",
        timePeriod: "Quarterly"  // New state to track selected time period
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to generate Excel file
    const handleDownload = () => {
        const sheetData = [
            ["Timestamp", "Name", "Email", "Client Type", "Role", "Sex", "Age", "Region", "Campus", "Transacted Office", "Service Availed", "CC Awareness", "CC Visibility", "CC Help", "SQD0", "SQD1", "SQD2", "SQD3", "SQD4", "SQD5", "SQD6", "SQD7", "SQD8", "Comments", "Time Period"],
            [
                new Date().toLocaleString(), 
                formData.name, 
                formData.email, 
                formData.clientType, 
                formData.role, 
                formData.sex, 
                formData.age, 
                formData.region, 
                formData.campus, 
                formData.transactedOffice, 
                formData.serviceAvailed, 
                formData.ccAwareness, 
                formData.ccVisibility, 
                formData.ccHelp, 
                formData.SQD0, 
                formData.SQD1, 
                formData.SQD2, 
                formData.SQD3, 
                formData.SQD4, 
                formData.SQD5, 
                formData.SQD6, 
                formData.SQD7, 
                formData.SQD8, 
                formData.comments,
                formData.timePeriod  // Add the selected time period to the data
            ]
        ];

        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Survey Responses");
        
        // Create the download link and trigger it
        XLSX.writeFile(wb, `survey_responses_${formData.timePeriod.toLowerCase()}.xlsx`);
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <form className="w-11/12 bg-white shadow-lg rounded-lg p-6">
                <div className="mt-4 bg-transparent p-6">
                    <div className="flex justify-center">
                        <img src={logoUSTP} alt="Description of image" className="max-h-40" />
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-center font-bold text-4xl">
                        USTP HARMONIZED CLIENT SATISFACTION SURVEY <br /> (Online Version)
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <div className="mt-8 mb-4 text-2xl">
                            <p>
                                <b>ENGLISH VERSION:</b> This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback on your recently concluded transaction will help this office provide a better service. Personal information shared will be kept confidential.
                            </p>
                        </div>
                        <hr />
                        <div className="font-bold mt-6 mb-4 text-2xl">I am a <span className="text-red-500">{attemptedSubmit && !formData.role ? "*" : ""}</span></div>
                        {["Faculty", "Non-Teaching Staff", "Student", "Guardian/Parent of Student", "Alumna", "Others"].map((role) => (
                            <div key={role} className="flex text-2xl items-center mt-4 mb-4">
                                <input
                                    type="radio"
                                    name="role"
                                    value={role}
                                    checked={formData.role === role}
                                    onChange={handleChange}
                                    className="form-radio h-6 w-6 text-blue-600" />
                                <label className="ml-2 mb-2 text-2xl">{role}</label>
                            </div>
                        ))}

                        <hr />
                        <strong className="mt-12 text-center block text-4xl">Citizen's Charter and Service Quality Dimensions</strong>
                        <div className="mt-8 mb-10">
                            <div className="font-bold text-2xl">CC1. Which of the following best describes your awareness of a CC?</div>
                            {["I know what a CC is and I saw this office's CC.",
                                "I know what a CC is but I did NOT see this office's CC.",
                                "I learned of the CC only when I saw this office's CC.",
                                "I do not know what a CC is and I did not see one in this office."
                            ].map((answer, index) => (
                                <div key={index} className="flex items-center mb-2 mt-4">
                                    <input
                                        type="radio"
                                        name="ccAwareness"
                                        value={answer}
                                        checked={formData.ccAwareness === answer}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />
                                    <label className="ml-2 text-2xl ">{answer}</label>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <div className="font-bold  text-2xl">CC2. If aware of CC (answered 1-3 in CC1), would you say the office was...?</div>
                            {["Easy to see", "Somewhat easy to see", "Difficult to see", "Not visible at all", "N/A"].map((answer, index) => (
                                <div key={index} className="flex items-center mt-4">
                                    <input
                                        type="radio"
                                        name="ccVisibility"
                                        value={answer}
                                        checked={formData.ccVisibility === answer}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />
                                    <label className="ml-2 text-2xl">{answer}</label>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <div className="font-bold text-2xl">CC3. If aware of CC (answered 1-3 in CC1), how much did the CC help you in your transaction?</div>
                            {["Helped very much", "Somewhat helped", "Did not help", "N/A"].map((answer, index) => (
                                <div key={index} className="flex items-center mt-4">
                                    <input
                                        type="radio"
                                        name="ccHelp"
                                        value={answer}
                                        checked={formData.ccHelp === answer}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />
                                    <label className="ml-2 text-2xl">{answer}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr />
                    <strong className="mt-10 block mb-10 text-center text-4xl">Service Quality Dimensions:</strong>
                    <table className="w-full table-auto mt-8">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 text-center">Question</th>
                                <th className="border px-4 py-2 text-center">Strongly Agree</th>
                                <th className="border px-4 py-2 text-center">Agree</th>
                                <th className="border px-4 py-2 text-center">Neither Agree nor Disagree</th>
                                <th className="border px-4 py-2 text-center">Disagree</th>
                                <th className="border px-4 py-2 text-center">Strongly Disagree</th>
                                <th className="border px-4 py-2 text-center">N/A</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[ 
                                "I am satisfied with the service that I availed.",
                                "I spent a reasonable amount of time on my transaction.",
                                "The office followed the transaction's requirements and steps based on the information provided.",
                                "The steps (including payment) I needed to do for my transaction were easy and simple.",
                                "I easily found information about my transaction from the office or its website.",
                                "I paid a reasonable amount of fees for my transaction. (If the service was free, mark the 'N/A' column)",
                                "I am confident that my online transaction was secure.",
                                "The office's online support was available, and (if asked questions) online support was quick to respond.",
                                "I got what I needed from the government office, or (if denied) denial of the request was sufficiently explained to me."
                            ].map((question, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-left">{`SQD${index}: ${question}`}</td>
                                    {["Strongly Agree", "Agree", "Neither agree or disagree", "Disagree", "Strongly Disagree", "N/A"].map((response) => (
                                        <td key={response} className="border px-4 py-2 text-center">
                                            <input
                                                type="radio"
                                                name={`SQD${index}`}
                                                value={response}
                                                checked={formData[`SQD${index}`] === response}
                                                onChange={handleChange}
                                                className="form-radio h-6 w-6 text-blue-600"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 mb-8">
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            placeholder="Any Comments or Suggestions?"
                            className="w-full h-32 border p-4 rounded-lg"
                        />
                    </div>

                    <div className="mt-4 mb-6">
                        <strong className="text-xl">Select the time period for your report:</strong>
                        <div className="flex">
                            {["Quarterly", "Semi-Annually", "Annually"].map((period) => (
                                <div key={period} className="mr-4">
                                    <input
                                        type="radio"
                                        name="timePeriod"
                                        value={period}
                                        checked={formData.timePeriod === period}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600"
                                    />
                                    <label className="ml-2 text-xl">{period}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <button
                            type="button"
                            onClick={handleDownload} // Trigger Excel download
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-xl"
                        >
                            Download Survey Data as Excel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EnglishVersionForm;
