import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoUSTP from "../../../assets/images/logoUSTP.png";
import supabase from "../../../service/supabase"; // Import your supabase client
import useUserStore from "../../../store/useUserStore";
import { id } from "date-fns/locale";

const EnglishVersionForm = () => {
  const { userMetadata } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const { requestData = {} } = location.state || {};

  const [jobRequest, setJobRequest] = useState(null);
  const [requestId, setRequestId] = useState(location.state?.requestId || null);

  const [formData, setFormData] = useState({
    name: `${userMetadata.fName || ""} ${userMetadata.lName || ""}`,
    email: userMetadata.email || "",
    clientType: "Citizen",
    role: "",
    sex: "",
    date: "",
    age: "",
    region: "Region X",
    campus: "Cagayan de Oro",
    transactedOffice: requestData.departmentName || "",
    serviceAvailed: requestData.description || "",
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
    idNumber: userMetadata.idNumber, // Directly assign requestId value here
  });

  console.log(
    "Initial transactedOffice:",
    requestData.departmentName || "Null"
  );
  console.log("Initial serviceAvailed:", requestData.description || "Null");

  useEffect(() => {
    const fetchJobRequestData = async () => {
      try {
        setLoading(true);

        // Fetch assigned department and job description
        const { data: jobRequest, error: jobRequestError } = await supabase
          .from("Request")
          .select("description, requestId")
          .eq("requestId", location.state?.requestId || null)
          .single();

        if (jobRequestError) throw jobRequestError;

        const { data: assignments, error: assignmentsError } = await supabase
          .from("Department_request_assignment")
          .select("deptId")
          .eq("requestId", jobRequest.requestId);

        if (assignmentsError) throw assignmentsError;

        const { data: department, error: departmentError } = await supabase
          .from("Department")
          .select("deptName")
          .eq("deptId", assignments[0]?.deptId || null)
          .single();

        if (departmentError) throw departmentError;

        // Update formData with department name and job description
        setFormData((prev) => ({
          ...prev,
          departmentName: department?.deptName || "Unknown Department",
          jobDescription: jobRequest.description || "No description available.",
        }));

        // Log department name and job description
        console.log("Assigned Department:", department?.deptName);
        console.log("Job Description:", jobRequest.description);
      } catch (error) {
        console.error("Error fetching job request data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.requestId) {
      fetchJobRequestData();
    }
  }, [location.state?.requestId]);

  //BIRTHDATE
  useEffect(() => {
    // Age Calculation
    if (userMetadata.birthDate) {
      const birthYear = new Date(userMetadata.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      setFormData((prevData) => ({
        ...prevData,
        age: calculatedAge.toString(),
      }));
    }
  }, [userMetadata.birthDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setAttemptedSubmit(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Add the current timestamp to the formData in the desired format
      const timestamp = new Date().toLocaleString("en-PH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      });

      const formDataWithTimestamp = {
        ...formData,
        date: timestamp,
      };

      // Insert data into Supabase
      const { data, error } = await supabase
        .from("Client_satisfaction_survey")
        .insert([formDataWithTimestamp]);

      if (error) {
        console.error("Error submitting form:", error.message);
        alert("Failed to submit the form. Please try again.");
      } else {
        alert("Form submitted successfully!");
        navigate("/success"); // Redirect after successful submission
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form className="w-11/12 bg-white shadow-lg rounded-lg p-6">
        <div className="mt-4 bg-transparent p-6">
          <div className="flex justify-center">
            <img
              src={logoUSTP}
              alt="Description of image"
              className="max-h-40"
            />
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
                This Client Satisfaction Measurement (CSM) tracks the customer
                experience of government offices. Your feedback on your recently
                concluded transaction will help this office provide a better
                service. Personal information shared will be kept confidential.
              </p>
            </div>

            <hr />
            <div className="font-bold mt-6 mb-4 text-2xl">
              I am a{" "}
              <span className="text-red-500">
                {attemptedSubmit && !formData.role ? "*" : ""}
              </span>
            </div>
            {[
              "Faculty",
              "Non-Teaching Staff",
              "Student",
              "Guardian/Parent of Student",
              "Alumna",
              "Others",
            ].map((role) => (
              <div key={role} className="flex text-2xl items-center mt-4 mb-4">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={formData.role === role}
                  onChange={handleChange}
                  className="form-radio h-6 w-6 text-blue-600"
                />
                <label className="ml-2 mb-2 text-2xl">{role}</label>
              </div>
            ))}

            <hr />
            <strong className="mt-12 text-center block text-4xl">
              Citizen's Charter and Service Quality Dimensions
            </strong>
            <div className="mt-8 mb-10">
              <div className="font-bold text-2xl">
                CC1. Which of the following best describes your awareness of a
                CC?
              </div>
              {[
                "I know what a CC is and I saw this office's CC.",
                "I know what a CC is but I did NOT see this office's CC.",
                "I learned of the CC only when I saw this office's CC.",
                "I do not know what a CC is and I did not see one in this office.",
              ].map((answer, index) => (
                <div key={index} className="flex items-center mb-2 mt-4">
                  <input
                    type="radio"
                    name="ccAwareness"
                    value={answer}
                    checked={formData.ccAwareness === answer}
                    onChange={handleChange}
                    className="form-radio h-6 w-6 text-blue-600"
                  />
                  <label className="ml-2 text-2xl ">{answer}</label>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="font-bold  text-2xl">
                CC2. If aware of CC (answered 1-3 in CC1), would you say the
                office was...?
              </div>
              {[
                "Easy to see",
                "Somewhat easy to see",
                "Difficult to see",
                "Not visible at all",
                "N/A",
              ].map((answer, index) => (
                <div key={index} className="flex items-center mt-4">
                  <input
                    type="radio"
                    name="ccVisibility"
                    value={answer}
                    checked={formData.ccVisibility === answer}
                    onChange={handleChange}
                    className="form-radio h-6 w-6 text-blue-600"
                  />
                  <label className="ml-2 text-2xl">{answer}</label>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="font-bold text-2xl">
                CC3. If aware of CC (answered 1-3 in CC1), how much did the CC
                help you in your transaction?
              </div>
              {[
                "Helped very much",
                "Somewhat helped",
                "Did not help",
                "N/A",
              ].map((answer, index) => (
                <div key={index} className="flex items-center mt-4">
                  <input
                    type="radio"
                    name="ccHelp"
                    value={answer}
                    checked={formData.ccHelp === answer}
                    onChange={handleChange}
                    className="form-radio h-6 w-6 text-blue-600"
                  />
                  <label className="ml-2 text-2xl">{answer}</label>
                </div>
              ))}
            </div>
          </div>

          <hr />
          <strong className="mt-10 block mb-10 text-center text-4xl">
            Service Quality Dimensions:
          </strong>
          <table className="w-full table-auto mt-8">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">Question</th>
                <th className="border px-4 py-2 text-center">Strongly Agree</th>
                <th className="border px-4 py-2 text-center">Agree</th>
                <th className="border px-4 py-2 text-center">
                  Neither Agree nor Disagree
                </th>
                <th className="border px-4 py-2 text-center">Disagree</th>
                <th className="border px-4 py-2 text-center">
                  Strongly Disagree
                </th>
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
                "I got what I needed from the government office, or (if denied) denial of the request was sufficiently explained to me.",
              ].map((question, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-left">{`SQD${index}: ${question}`}</td>
                  {[
                    "Strongly Agree",
                    "Agree",
                    "Neither agree or disagree",
                    "Disagree",
                    "Strongly Disagree",
                    "N/A",
                  ].map((response) => (
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

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={handleSubmit} // Trigger form submission
              className="bg-green-500 text-white py-2 px-4 rounded-lg text-xl"
            >
              Submit Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnglishVersionForm;
