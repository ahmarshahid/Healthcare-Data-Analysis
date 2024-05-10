import React, { useState, useEffect } from 'react';
import PatientNav from "./patientNav";
import { useLocation } from 'react-router-dom';

const SelectDoctor = () => {
    const location = useLocation();
    const { doctors } = location.state ; // Destructure doctors from location.state or provide an empty array as default

    console.log(doctors)
    const [selectedDoctor, setSelectedDoctor] = useState({ id: 0 });

    const setDocIdInput = (value) => {
        setSelectedDoctor({ id: value });
    };

    useEffect(() => {
        console.log(selectedDoctor.DoctorID);
    }, [selectedDoctor.DoctorID]); 

    return (
        <div>
            <PatientNav/>
            <h1>Select Doctor</h1>
            {doctors.map((doctor, index) => (
                <label className="label2" key={index}>
                    <input 
                        value={doctor.DoctorID} 
                        name="value-radio2" 
                        className="radio-input2" 
                        type="radio" 
                        id={doctor.DoctorID}
                        onChange={(e) => setDocIdInput(doctor.DoctorID)} // Pass item directly to setInput
                    />
                    <div className="radio-design2"></div>
                    <div className="label-text2">{doctor.FirstName}</div>
                </label>
            ))}
        </div>
    );
}

export default SelectDoctor;
