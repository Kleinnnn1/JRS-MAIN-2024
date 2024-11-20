import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoUSTP from "../../../assets/images/logoUSTP.png";
import Swal from 'sweetalert2';

// -Name, Email, Age is derived na sa Profile Account 
//  so it has something to do sa backend to get it from the database
// - Get the age is e subtract ang current year ug year(birthdate) sa user  ug ex. 2024 - 2002 = 22
// - Automatic Set Region as Region X
// - Automatic Set Campus in Cagayan De Oro
// - Transacted Office is based on the Job Request Details referred "Department" e.g BGMS, CSWS, MEWS
// - Ang Service availed is gikuha on Job Description

const EnglishVersionForm = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(1);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [formData, setFormData] = useState({
        name: "", //I based sa User Profile Name
        email: "", //I based sa User Profile Email
        clientType: "Citizen", // I set na daan Citizen
        role: "",  
        sex: "",  //I based sa User Profile detail sex
        age: "", 
        region: "Region X",
        campus: "Cagayan de Oro",
        transactedOffice: "",
        serviceAvailed: "s",
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
    });


    // SweetAlert message shown when the form is loaded
    // useEffect(() => {
    //     Swal.fire({

    //         html: '<b>ENGLISH VERSION:</b> <br /> This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. <br /> Your feedback on your recently concluded transaction will help this office provide a better service. Personal information shared will be kept confidential.',
    //         icon: 'info',
    //         confirmButtonText: 'Got it!',
    //     });
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, clientType, role, sex, age, region, campus, transactedOffice, serviceAvailed, ccAwareness, ccVisibility, ccHelp, SQD0, SQD1, SQD2, SQD3, SQD4, SQD5, SQD6, SQD7, SQD8, comments } = formData;

        try {
            const response = await fetch(`https://v1.nocodeapi.com/krunxx/google_sheets/IjTkhUmrxJEeUdCx?tabId=English`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([[new Date().toLocaleString(), name, email, clientType, role, sex, age, region, campus, transactedOffice, serviceAvailed, ccAwareness, ccVisibility, ccHelp, SQD0, SQD1, SQD2, SQD3, SQD4, SQD5, SQD6, SQD7, SQD8, comments]])
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Thank you!',
                    text: "Thank you for answering the survey. God Bless!",
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setFormData({
                    name: "",
                    email: "",
                    clientType: "",
                    role: "",
                    sex: "",
                    age: "",
                    region: "",
                    campus: "",
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
                });
                setCurrentSection(1);
                navigate("/requestor/home");
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-11/12 bg-white shadow-lg rounded-lg p-6">
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

                {/* Section 1 */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Left Grid: Information Section, Transacted Office and Service Fields */}
                    <div>
                        <div className="mt-8 mb-4 text-2xl">
                            <p>
                                <b>ENGLISH VERSION:</b> This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback on your recently concluded transaction will help this office provide a better service. Personal information shared will be kept confidential.
                            </p>
                        </div>

                        <hr />
                        {/* Client Type */}
                        {/* <div className="font-bold text-2xl mt-6 mb-4">Client Type <span className="text-red-500">{attemptedSubmit && !formData.clientType ? "*" : ""}</span></div>
                        {["Citizen", "Business", "Government (Employee or another agency)"].map((type) => (
                            <div key={type} className="flex items-center text-2xl mt-4 mb-4">
                                <input
                                    type="radio"
                                    name="clientType" value={type}
                                    checked={formData.clientType === type}
                                    onChange={handleChange}
                                    className="form-radio h-6 w-6 text-blue-600" />
                                <label className="ml-2 mb-2">{type}</label>
                            </div>
                        ))} */}

                        <hr />
                        {/* Role */}
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
                        {/* Transacted Office */}
                        {/* <div className="mt-8 text-2xl">
                            <label className="font-bold">Transacted Office <span className="text-red-500">{attemptedSubmit && !formData.transactedOffice ? "*" : ""}</span></label>
                            <select name="transactedOffice" className="border rounded-md p-2 w-full mt-4" value={formData.transactedOffice} onChange={handleChange}>
                                <option value="">Select an office</option>
                                {getTransactedOffices(formData.campus).map((office) => (
                                    <option key={office} value={office}>{office}</option>
                                ))}
                            </select>
                        </div> */}

                        {/* Service Availed */}
                        {/* <div className="mt-6 text-2xl">
                            <label className="font-bold">Please indicate service availed <span className="text-red-500">{attemptedSubmit && !formData.serviceAvailed ? "*" : ""}</span></label>
                            <input type="text" name="serviceAvailed" className="border rounded-md p-2 w-full mt-4" value={formData.serviceAvailed} onChange={handleChange} />
                        </div>
                    </div> */}

                        {/* Right Grid: Remaining Form Sections */}
                        {/* <div> */}
                        <hr />

                        <strong className="mt-12 text-center block text-4xl">Citizen's Charter and Service Quality Dimensions</strong>

                        {/* Awareness */}
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

                        {/* Visibility */}
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

                        {/* Help */}
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
                </div>
                <hr />
                {/* Service Quality Dimensions */}
                <strong className="mt-10 block mb-10 text-center text-4xl">Service Quality Dimensions:</strong>
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
                    <div key={index} className="mt-2 mb-10 text-2xl">
                        <div className="font-bold mt-10">SQD{index}. {question} <span className="text-red-500">{attemptedSubmit && !formData[`SQD${index}`] ? "*" : ""}</span></div>
                        {["Strongly Agree", "Agree", "Neither agree or disagree", "Disagree", "Strongly Disagree", "N/A"].map((response) => (
                            <div key={response} className="flex flex-wrap items-center justify-start space-x-6 mt-4">
                                <input
                                    type="radio"
                                    name={`SQD${index}`}
                                    value={response}
                                    checked={formData[`SQD${index}`] === response}
                                    onChange={handleChange}
                                    className="form-radio h-6 w-6 text-blue-600" />
                                <label className="ml-2 text-2xl">{response}</label>
                            </div>
                        ))}
                    </div>
                ))}

                <label className="font-bold text-2xl">Do you have any other information/comments / suggestions/recommendations?</label>
                <textarea
                    name="comments"
                    className="border rounded-md p-3 w-full h-32"  // Adjust height with h-32 (you can change the number as per your need)
                    value={formData.comments}
                    onChange={handleChange}
                />

                <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => navigate('/requestor/select')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
            </form>
        </div>

    );
};

export default EnglishVersionForm;