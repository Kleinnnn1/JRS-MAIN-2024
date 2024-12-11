import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoUSTP from "../../../assets/images/logoUSTP.png";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // Import xlsx library
import supabase from "../../../service/supabase";

// NOTE: UNDER CONSTRUCTION PA NI KAREN PAG INSERT SA SUPABASE, ONGOING TASK

const EnglishVersionForm = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(1);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     clientType: "Citizen",
    //     role: "",
    //     sex: "",
    //     age: "",
    //     region: "Region X",
    //     campus: "Cagayan de Oro",
    //     transactedOffice: "",
    //     serviceAvailed: "",
    //     ccAwareness: "",
    //     ccVisibility: "",
    //     ccHelp: "",
    //     SQD0: "",
    //     SQD1: "",
    //     SQD2: "",
    //     SQD3: "",
    //     SQD4: "",
    //     SQD5: "",
    //     SQD6: "",
    //     SQD7: "",
    //     SQD8: "",
    //     comments: "",
    //     timePeriod: "Quarterly"  // New state to track selected time period
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    // const [users, setUsers] = useState({})


    // console.log(users)

    // useEffect(() => {
    //     fetchUsers()
    // }, [])

    // async function fetchUsers() {
    //     const { data } = await supabase
    //         .from('client_satisfaction_survey')
    //         .select('*')
    //     setUsers(data)
    // }

    const [user, setUser] = useState({
        name: '', age: ''
    })

      console.log(user)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const { data } = await supabase
            .from('client_satisfaction_survey')
            .select('*')
        setUsers(data)
    }

    function handleChange(event) {

        setUser(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function createUser() {
        await supabase
            .from('client_satisfaction_survey')
            .insert({ name: user.name, age: user.age })

        fetchUsers()


    }


    return (
        <div className="flex justify-center items-center bg-gray-100">
            <form onSubmit={createUser} className="w-11/12 bg-white shadow-lg rounded-lg p-6">
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
                    </div>

                    <input
                        type="text"
                        placeholder="Name"
                        name='name'
                        onChange={handleChange}

                    />
                    <input
                        type="number"
                        placeholder="Age"
                        name='age'
                        onChange={handleChange}

                    />
                    <button type='submit'>Create</button>


                </div>

            </form>
        </div>
    );
};

export default EnglishVersionForm;