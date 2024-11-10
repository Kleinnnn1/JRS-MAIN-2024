import React from 'react';
import logoUSTP from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function SelectSurveyForm() {
    const navigate = useNavigate();

    const handleLanguageSelection = (path) => {
        navigate(path);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="w-11/12 max-w-md">
                <div className="mt-4 bg-transparent p-6 rounded-lg shadow-md">
                    <div className="flex justify-center">
                        <img src={logoUSTP} alt="LogoUSTP" className="max-h-40" />
                    </div>
                </div>
                <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-center font-bold text-3xl p-2 m-2">
                        USTP HARMONIZED CLIENT SATISFACTION SURVEY (Online Version)
                    </h1>
                    <div>

                        {/* ENGLISH VERSION FORM */}
                        <p className="text-gray-700 font-semibold">
                            (Your preferred language to use in answering this survey:)
                        </p>
                        <br />
                        <b>Dear Valuable Client,</b>
                        <p>
                            Please take a few minutes to complete the CLIENT SATISFACTION SURVEY FORM. Your feedback will enable us to see how we're doing and find out how we can improve. Please place a check mark in the space that corresponds to your answer.
                        </p>
                        <button
                            type="button"
                            onClick={() => handleLanguageSelection('/requestor/english_version')}
                            className="w-full mt-4 p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                        >
                            English
                        </button>

                        {/* TAGALOG VERSION */}
                        <hr className="my-4" />

                        <p className="text-gray-700 font-semibold mb-2">
                            (Ang iyong gustong wikang gagamitin sa pagsagot sa surbey na ito:)
                        </p>
                        <b>Minamahal na Kliyente,</b>
                        <p>
                            Mangyaring maglaan ng ilang minuto upang kumpletuhin ang CLIENT SATISFACTION SURVEY FORM. Ang iyong feedback ay magbibigay-daan sa amin upang makita kung paano kami gumagana at malaman kung paano kami mapapabuti. Pakilagyan ng tsek ang patlang na tumutugma sa iyong sagot.
                        </p>
                        <button
                            type="button"
                            onClick={() => handleLanguageSelection('/requestor/tagalog_version')}
                            className="w-full mt-4 p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                        >
                            Filipino or Tagalog
                        </button>

                        <hr className="my-4" />

                        <button
                            type="button"
                            disabled
                            className="w-full mt-4 p-2 bg-gray-300 text-gray-500 font-semibold rounded-md cursor-not-allowed"
                        >
                            Bisaya (Not yet available)
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}