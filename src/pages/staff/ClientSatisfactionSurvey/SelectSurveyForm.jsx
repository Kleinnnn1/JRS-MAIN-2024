import React from 'react';
import logoUSTP from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function SelectSurveyForm() {
    const navigate = useNavigate();

    const handleLanguageSelection = (path) => {
        navigate(path);
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <form className="w-10/12">
                <div className="mt-4 bg-transparent p-6 rounded-lg shadow-md">
                    <div className="flex justify-center">
                        <img src={logoUSTP} alt="LogoUSTP" className="max-h-40" />
                    </div>
                </div>
                <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-center font-bold text-3xl p-2 m-2">
                        USTP HARMONIZED CLIENT SATISFACTION SURVEY (Online Version)
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* ENGLISH VERSION FORM */}
                        <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
                          
                            <br />
                            <b>Dear Valuable Client,</b>
                            <p>
                                Please take a few minutes to complete the CLIENT SATISFACTION SURVEY FORM. Your feedback will enable us to see how we're doing and find out how we can improve.
                                <p></p>
                            </p>
                            <button
                                type="button"
                                onClick={() => handleLanguageSelection('/requestor/english_version')}
                                className="w-full mt-12 p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                            >
                                Start
                            </button>
                        </div>

                        {/* TAGALOG VERSION
                        <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
                            <p className="text-gray-700 font-semibold mb-8">
                                (Ang iyong gustong wikang gagamitin sa pagsagot sa surbey na ito:)
                            </p>
                            <b>Minamahal na Kliyente,</b>
                            <p>
                                Mangyaring maglaan ng ilang minuto upang kumpletuhin ang CLIENT SATISFACTION SURVEY FORM. Ang iyong feedback ay magbibigay-daan sa amin upang makita kung paano kami gumagana at malaman kung paano kami mapapabuti.
                            </p>
                            <button
                                type="button"
                                // onClick={() => handleLanguageSelection('/requestor/tagalog_version')}
                                className="w-full mt-4 p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                            >
                                Filipino or Tagalogs
                            </button>
                        </div> */}
                    </div>
                </div>
            </form>
        </div>
    );
}
