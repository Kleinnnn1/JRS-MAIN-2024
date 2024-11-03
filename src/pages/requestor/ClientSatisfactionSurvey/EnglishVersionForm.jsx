import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logoUSTP from "../../../assets/images/logoUSTP.png";
import Swal from 'sweetalert2';

const EnglishVersionForm = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [currentSection, setCurrentSection] = useState(1);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [formData, setFormData] = useState({
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

    const getTransactedOffices = (campus) => {
        switch (campus) {
            case "Main Campus":
            case "Balubal":
            case "Cagayan de Oro":
            case "Claveria":
            case "Jasaan":
            case "Oroquieta":
            case "Panaon":
            case "Villanueva":
            case "System Offices":
                return [
                    "Building and Grounds Maintenance Unit (MEWS)",
                    "Civil and Sanitary Works Unit (CSWS)",
                    "Mechanical & Electrical Works Unit (MEWS)"
                ];
            default:
                return [];
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleNext = () => {
        setAttemptedSubmit(true);
        if (currentSection === 1) {
            if (formData.name && formData.email && formData.clientType && formData.role && formData.sex && formData.age && formData.region) {
                setCurrentSection(currentSection + 1);
            }
        } else if (currentSection === 2) {
            if (formData.campus) {
                setCurrentSection(currentSection + 1);
            }
        } else if (currentSection === 3) {
            if (formData.serviceAvailed) {
                setCurrentSection(currentSection + 1);
            }
        }
    };

    const handleBack = () => {
        setCurrentSection(currentSection - 1);
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
                navigate("/requestor/home"); // Navigate after successful submission
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className=" w-11/12 max-w-md">
                <div className="mt-4 bg-transparent p-6 rounded-lg shadow-md">
                    <div className="flex justify-center">
                        <img src={logoUSTP} alt="Description of image" className="max-h-40" />
                    </div>
                </div>
                <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-center font-semibold text-3xl">
                        USTP HARMONIZED CLIENT SATISFACTION SURVEY (Online Version)
                    </h3>
                </div>
                {/* Section 1 */}
                {currentSection === 1 && (
                    <div>
                        <div className="mt-4  bg-white p-6 rounded-lg shadow-md">
                            <p><b>ENGLISH VERSION:</b> This Client Satisfaction Measurement
                                (CSM) tracks the customer experience of government offices. Your feedback on
                                your recently concluded transaction will help this office provide a
                                better service. Personal information shared will be kept confidential</p>
                        </div>
                        {/* NAME */}
                        <div className="mt-4 p-4  bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold mb-96">Name <span className="text-red-500">{attemptedSubmit && !formData.name ? "*" : ""}</span></label>
                            <input type="text" name="name" className="border rounded-md p-2 w-full text-lg" value={formData.name} onChange={handleChange} />
                        </div>

                        {/* Email */}
                        <div className="mt-4 p-4  bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold">Email <span className="text-red-500">{attemptedSubmit && !formData.email ? "*" : ""}</span></label>
                            <input type="email" name="email" className="border rounded-md p-2 w-full" value={formData.email} onChange={handleChange} />
                        </div>
                        {/* Client Type */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">

                            <div className="font-bold">Client Type <span className="text-red-500">{attemptedSubmit && !formData.clientType ? "*" : ""}</span></div>
                            {["Citizen", "Business", "Government (Employee or another agency)"].map((type) => (
                                <div key={type} className="flex items-center mt-4">

                                    <input
                                        type="radio"
                                        name="clientType" value={type}
                                        checked={formData.clientType === type}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />

                                    <label className="ml-2">{type}</label>
                                </div>
                            ))}
                        </div>
                        {/* Role */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">I am a <span className="text-red-500">{attemptedSubmit && !formData.role ? "*" : ""}</span></div>
                            {["Faculty", "Non-Teaching Staff", "Student", "Guardian/Parent of Student", "Alumna", "Others"].map((role) => (
                                <div key={role} className="flex items-center  mt-4">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />
                                    <label className="ml-2">{role}</label>
                                </div>
                            ))}
                        </div>
                        {/* Sex */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">Sex <span className="text-red-500">{attemptedSubmit && !formData.sex ? "*" : ""}</span></div>
                            {["Male", "Female"].map((sex) => (
                                <div key={sex} className="flex items-center mt-4">

                                    <input
                                        type="radio"
                                        name="sex"
                                        value={sex}
                                        checked={formData.sex === sex}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />

                                    <label className="ml-2">{sex}</label>
                                </div>
                            ))}
                        </div>
                        {/* Age */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold ">Age <span className="text-red-500">{attemptedSubmit && !formData.age ? "*" : ""}</span></label>
                            <input type="number" name="age" className="border rounded-md p-2 w-full mt-4" value={formData.age} onChange={handleChange} />
                        </div>
                        {/* Region */}
                        {/* Region */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">Region <span className="text-red-500 ">{attemptedSubmit && !formData.region ? "*" : ""}</span></div>
                            {[
                                "Region I – Ilocos Region",
                                "Region II – Cagayan Valley",
                                "Region III – Central Luzon",
                                "Region IV-A – CALABARZON",
                                "Region IV-B - MIMAROPA",
                                "Region V – Bicol Region",
                                "Region VI – Western Visayas",
                                "Region VII – Central Visayas",
                                "Region VIII – Eastern Visayas",
                                "Region IX – Zamboanga Peninsula",
                                "Region X – Northern Mindanao",
                                "Region XI – Davao Region",
                                "Region XII – SOCCSKSARGEN",
                                "Region XIII – Caraga",
                                "NCR – National Capital Region",
                                "CAR – Cordillera Administrative Region",
                                "BARMM – Bangsamoro Autonomous Region in Muslim Mindanao",
                            ].map((region) => (
                                <div key={region} className="flex items-center mt-4">
                                    <input
                                        type="radio"
                                        name="region"
                                        value={region}
                                        checked={formData.region === region}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" 
                                    />
                                    <label className="ml-2">{region}</label>
                                </div>
                            ))}
                        </div>
                        {/* Campus */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold ">Campus <span className="text-red-500">{attemptedSubmit && !formData.campus ? "*" : ""}</span></div>
                            <select name="campus" className="border rounded-md p-2 w-full mt-4" value={formData.campus} onChange={handleChange}>
                                <option value="">Select a campus</option>
                                {[
                                    "Main Campus",
                                    "Balubal",
                                    "Cagayan de Oro",
                                    "Claveria",
                                    "Jasaan",
                                    "Oroquieta",
                                    "Panaon",
                                    "Villanueva",
                                    "System Offices"
                                ].map((campus) => (
                                    <option key={campus} value={campus}>{campus}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                            <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                        </div>
                    </div>
                )}
                {/* Section 2 */}
                {currentSection === 2 && (
                    <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
                        <label className="bg-yellow-400 text-center w-full font-bold p-4 rounded-lg block"> CAMPUS: {formData.campus}</label>
                        <div className="mt-4">
                            <label className="font-bold mt-4">Transacted Office <span className="text-red-500">{attemptedSubmit && !formData.transactedOffice ? "*" : ""}</span></label>
                            <select name="transactedOffice" className="border rounded-md p-2 w-full mt-4" value={formData.transactedOffice} onChange={handleChange}>
                                <option value="">Select an office</option>
                                {getTransactedOffices(formData.campus).map((office) => (
                                    <option key={office} value={office}>{office}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                            <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                        </div>
                    </div>
                )}
                {/* Section 3 */}
                {currentSection === 3 && (
                    <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
                        <div className="mt-4">
                            <label className="font-bold">Please indicate service availed <span className="text-red-500">{attemptedSubmit && !formData.serviceAvailed ? "*" : ""}</span></label>
                            <input type="text" name="serviceAvailed" className="border rounded-md p-2 w-full mt-4" value={formData.serviceAvailed} onChange={handleChange} />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                            <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                        </div>
                    </div>
                )}
                {/* Section 4 */}
                {currentSection === 4 && (
                    <div className="">

                        <div className="mt-10 bg-white p-7 rounded-lg shadow-md">
                            <strong>Citizen's Charter and Service Quality Dimensions</strong>
                        </div>
                        {/* Awareness */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">CC1. Which of the following best describes your awareness of a CC?</div>
                            {["I know what a CC is and I saw this office's CC.",
                                "I know what a CC is but I did NOT see this office's CC.",
                                "I learned of the CC only when I saw this office's CC.",
                                "I do not know what a CC is and I did not see one in this office."].map((answer, index) => (
                                    <div key={index} className="flex items-center mt-4">
                                        <input 
                                            type="radio" 
                                            name="ccAwareness" 
                                            value={answer} 
                                            checked={formData.ccAwareness === answer} 
                                            onChange={handleChange} 
                                            className="form-radio h-6 w-6 text-blue-600" />
                                        <label className="ml-2">{answer}</label>
                                    </div>
                                ))}
                        </div>
                        {/* Visibility */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">CC2. If aware of CC (answered 1-3 in CC1), would you say the office was...?</div>
                            {["Easy to see", "Somewhat easy to see", "Difficult to see", "Not visible at all", "N/A"].map((answer, index) => (
                                <div key={index} className="flex items-center mt-4">
                                    <input  
                                        type="radio" 
                                        name="ccVisibility" 
                                        value={answer} 
                                        checked={formData.ccVisibility === answer} 
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />
                                    <label className="ml-2">{answer}</label>
                                </div>
                            ))}
                        </div>
                        {/* Help */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">CC3. If aware of CC (answered 1-3 in CC1), how much did the CC help you in your transaction?</div>
                            {["Helped very much", "Somewhat helped", "Did not help", "N/A"].map((answer, index) => (
                                <div key={index} className="flex items-center mt-4">
                                    <input 
                                       type="radio" 
                                       name="ccHelp" 
                                       value={answer} 
                                       checked={formData.ccHelp === answer} 
                                       onChange={handleChange} 
                                       className="form-radio h-6 w-6 text-blue-600"/>
                                    <label className="ml-2">{answer}</label>
                                </div>
                            ))}
                        </div>
                        {/* Service Quality Dimensions */}
                        <strong className="mt-10 block bg-white p-7 rounded-lg shadow-md">Service Quality Dimensions:</strong>
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
                            <div key={index} className="mt-2  bg-white p-6 rounded-lg shadow-md">
                                <div className="font-bold">SQD{index}. {question} <span className="text-red-500">{attemptedSubmit && !formData[`SQD${index}`] ? "*" : ""}</span></div>
                                {["Strongly Agree", "Agree", "Neither agree or disagree", "Disagree", "Strongly Disagree", "N/A"].map((response) => (
                                    <div key={response} className="flex items-center mt-4">
                                        <input 
                                           type="radio" 
                                           name={`SQD${index}`} 
                                           value={response} 
                                           checked={formData[`SQD${index}`] === response} 
                                           onChange={handleChange} 
                                           className="form-radio h-6 w-6 text-blue-600"/>
                                        <label className="ml-2">{response}</label>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Comments */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold">Do you have any other information/comments  <br></br>/suggestions/recommendations?</label>
                            <textarea name="comments" className="border rounded-md p-2 w-full" value={formData.comments} onChange={handleChange} />
                        </div>

                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EnglishVersionForm;