import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logoUSTP from "../../../assets/images/logoUSTP.png";
import Swal from 'sweetalert2';

const TagalogVersionForm = () => {
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
            const response = await fetch(`https://v1.nocodeapi.com/krunxx/google_sheets/IjTkhUmrxJEeUdCx?tabId=Tagalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([[new Date().toLocaleString(), name, email, clientType, role, sex, age, region, campus, transactedOffice, serviceAvailed, ccAwareness, ccVisibility, ccHelp, SQD0, SQD1, SQD2, SQD3, SQD4, SQD5, SQD6, SQD7, SQD8, comments]])
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Salamat!',
                    text: "Salamat sa pagsagot sa survey. God Bless!",
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
                navigate("/staff/home"); // Navigate after successful submission
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
                            <p><b>FILIPINO o TAGALOG BERSYON:</b><br /> 
                            Ang  Client  Satisfaction   Measurement   (CSM)  ay  naglalayong   masubaybayan    
                            ang  karanasan   ng taumbayan hinggil sa kanilang
                                pakikitransaksyon   sa mga tanggapan  ng gobyerno.  <br /> <br />
                                 Makatutulong  ang inyong
                                kasagutan  ukol sa inyong  naging  karanasan  sa kakatapos   lamang  na transaksyon,   upang
                                mas mapabuti  at lalong
                                mapahusay
                                ang aming  serbisyo  publiko.
                                <br /> <br />
                                Ang personal  na impormasyon   na iyong ibabahagi  ay mananatiling   kumpidensyal.
                                Maaari  ring
                                piliin  na hindi sagutan  ang
                                sarbey  na ito.</p>
                        </div>
                        {/* PANGALAN */}
                        <div className="mt-4 p-4  bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold mb-96">Pangalan<span className="text-red-500">{attemptedSubmit && !formData.name ? "*" : ""}</span></label>
                            <input type="text" name="name" className="border rounded-md p-2 w-full text-lg" value={formData.name} onChange={handleChange} />
                        </div>

                        {/* EMAIL */}
                        <div className="mt-4 p-4  bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold">Email <span className="text-red-500">{attemptedSubmit && !formData.email ? "*" : ""}</span></label>
                            <input type="email" name="email" className="border rounded-md p-2 w-full" value={formData.email} onChange={handleChange} />
                        </div>
                        {/* Uri ng Kliyente */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">

                            <div className="font-bold">Uri ng Kliyente: <span className="text-red-500">{attemptedSubmit && !formData.clientType ? "*" : ""}</span></div>
                            {["Mamamayan", "Negosyo", "Gobyerno (Empleyado o Ahensiya)"].map((type) => (
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
                            <div className="font-bold">Ako ay isang: <span className="text-red-500">{attemptedSubmit && !formData.role ? "*" : ""}</span></div>
                            {["Guro", "Kawani na Hindi Nagtuturo", "Mag-aaral", "Tagapag-alaga/Magulang ng Mag-aaral", "Alumna", "Iba pa"].map((role) => (
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
                        {/* Kasarian */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">Kasarian: <span className="text-red-500">{attemptedSubmit && !formData.sex ? "*" : ""}</span></div>
                            {["Lalaki", "Babae"].map((sex) => (
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
                        {/* Edad */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold ">Edad: <span className="text-red-500">{attemptedSubmit && !formData.age ? "*" : ""}</span></label>
                            <input type="number" name="age" className="border rounded-md p-2 w-full mt-4" value={formData.age} onChange={handleChange} />
                        </div>
                        {/* Region */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">Rehiyon: <span className="text-red-500 ">{attemptedSubmit && !formData.region ? "*" : ""}</span></div>
                            {[
                                "Rehiyon I – Ilocos Region",
                                "Rehiyon II – Cagayan Valley",
                                "Region III – Central Luzon",
                                "Rehiyon IV-A – CALABARZON",
                                "Rehiyon IV-B - MIMAROPA",
                                "Rehiyon V – Bicol Region",
                                "Rehiyon VI – Western Visayas",
                                "Rehiyon VII – Central Visayas",
                                "Rehiyon VIII – Eastern Visayas",
                                "Rehiyon IX – Zamboanga Peninsula",
                                "Rehiyon X – Northern Mindanao",
                                "Rehiyon XI – Davao Region",
                                "Rehiyon XII – SOCCSKSARGEN",
                                "Rehiyon XIII – Caraga",
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
                        {/* Kampus */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold ">Kampus <span className="text-red-500">{attemptedSubmit && !formData.campus ? "*" : ""}</span></div>
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
                        <label className="bg-yellow-400 text-center w-full font-bold p-4 rounded-lg block"> PINILING KAMPUS: {formData.campus}</label>
                        <div className="mt-4">
                            <label className="font-bold mt-4">Nakipagtransaksyon sa opisina <span className="text-red-500">{attemptedSubmit && !formData.transactedOffice ? "*" : ""}</span></label>
                            <select name="transactedOffice" className="border rounded-md p-2 w-full mt-4" value={formData.transactedOffice} onChange={handleChange}>
                                <option value="">Pumili ng opisina</option>
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
                            <label className="font-bold">Mangyaring ipahiwatig ang serbisyo nga nagamit<span className="text-red-500">{attemptedSubmit && !formData.serviceAvailed ? "*" : ""}</span></label>
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

                        <strong>PANUTO:</strong> Lagyan ng <strong>tsek (✓)  </strong> ang iyong sagot sa mga sumusunod  na katanungan  tungkol  sa Citizen's  Charter (CC).
                                <br/>lto   ay isang opisyal  na dokumento  na naglalaman  ng mga serbisyo  sa isang ahensya/opisina   ng gobyerno,
                                 makikita  rito ang mga kinakailangan   na dokumento,   kaukulang   bayarin.  at pangkabuuang   oras  ng pagproseso.
                               
                        </div>
                        {/* Awareness */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <div className="font-bold">CC1 Alin sa mga sumusunod  ang naglalarawan   sa iyong  kaalaman  sa CC? </div>
                            {["Alam ko ang CC at nakita ko  ito sa napuntahang opisina",
                                "Alam ko ang CC pero hindi ko ito nakita sa napuntahang opisina",
                                "Nalaman ko ang CC nang makita ko ito sa napuntahang opisina",
                                "Hindi ko alam  kung ana ang CC at wala akong nakita sa napuntahang opisina (Lagyan ng tsek ang 'N/A'  sa CC2  at CC3  kapag ito ang iyong sagot)"].map((answer, index) => (
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
                            <div className="font-bold">CC2 Kung alam ang CC (Nag-tsek  sa opsyon  1-3 sa CC1),   masasabi  mo ba na ang CC nang  napuntahang opisina  ay ...</div>
                            {["Madaling makita", "Medyo madaling makita", "Mahirap makita", "Hindi makita", "N/A"].map((answer, index) => (
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
                            <div className="font-bold">CC3 Kung alam ang CC (nag-tsek sa opsyon  1-3 sa CC1),   gaano nakatulong  ang CC sa transaksyon   mo?</div>
                            {["Sobrang nakatulong", "Nakatulong naman", "Hindi nakatulong", "N/A"].map((answer, index) => (
                                <div key={index} className="flex items-center mt-4">
                                    <input
                                        type="radio"
                                        name="ccHelp"
                                        value={answer}
                                        checked={formData.ccHelp === answer}
                                        onChange={handleChange}
                                        className="form-radio h-6 w-6 text-blue-600" />
                                    <label className="ml-2">{answer}</label>
                                </div>
                            ))}
                        </div>
                        {/* Service Quality Dimensions */}
                        <strong className="mt-10 block bg-white p-7 rounded-lg shadow-md">PANUTO: Para sa SQD 0-8, lagyan ng tsek (✓) ang hanay na pianakaangkop sa iyong sagot</strong>
                        {[
                            "Nasiyahan   ako  sa serbisyo   na  aking natanggap  sa napuntahan  na tanggapan.",
                            "Makatwiran  ang  oras  na aking  ginugol para sa pagproseso    ng aking  transaksyon.",
                            "Ang opisina ay sumusunod  sa mga kinakailangang    dokumento    at  mga   hakbang batay   sa impormasyong ibinigay.",
                            "Ang mga hakbang sa pagproseso, kasama na ang pagbayad ay madali at simple lamang.",
                            "Mabilis at madali akong nakahanap ng impormasyon tungkol sa aking transaksyon mula sa opisina o sa website nito.",
                            "Nagbayad  ako  ng makatwirang   halaga para sa aking transaksyon. (Kung ang sebisyo ay ibinigay ng libre, malagay ng tsek sa hanay ng N/A.)",
                            "Pakiramdam   ko  ay patas  ang opisina sa lahat, o 'walang palakasan',  sa aking transaksyon.",
                            "Magalang     akong    trinato    ng    mga tauhan,   at  (kung   sakali   ako  ay  humingi   ng tulong)  alam  ko na  sila  ay handang  tumulong sa akin.",
                            "Nakuha  ko ang  kinakailangan   ko mula sa tanggapan   ng  gobyerno,   kung  tinanggihan man, ito ay sapat  na ipinaliwanag  sa akin."
                        ].map((question, index) => (
                            <div key={index} className="mt-2  bg-white p-6 rounded-lg shadow-md">
                                <div className="font-bold">SQD{index}. {question} <span className="text-red-500">{attemptedSubmit && !formData[`SQD${index}`] ? "*" : ""}</span></div>
                                {["Labis na sumasangayon", "Sumasangayon", "Walang kinikilingan", "Hindi sumasangayon", "Lubos na hindi sumasangayon", "N/A"].map((response) => (
                                    <div key={response} className="flex items-center mt-4">
                                        <input
                                            type="radio"
                                            name={`SQD${index}`}
                                            value={response}
                                            checked={formData[`SQD${index}`] === response}
                                            onChange={handleChange}
                                            className="form-radio h-6 w-6 text-blue-600" />
                                        <label className="ml-2">{response}</label>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Comments */}
                        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                            <label className="font-bold">Mga suhestiyon kung paano pa mapapabuti pa ang aming mga serbisyo (opsyonal): </label>
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

export default TagalogVersionForm;