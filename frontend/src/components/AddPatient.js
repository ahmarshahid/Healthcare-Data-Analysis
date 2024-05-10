import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PatientNav from "./patientNav";
import axios from "axios";

const AddPatient=()=>{

    const [address, setAddress] = useState('');
    const [Name, setName] = useState('');
    const [gender, setGender] = useState('male'); 
    const [CNIC, setCnic] = useState(''); 
    const [Bloodgrp, setBlood] = useState('A+'); 
    const [Pm, setPm] = useState('Card'); 
    const [Age, setAge] = useState('');
    const [ageGrp,setAgeGrp]=useState('');
    const [id,setId]=useState(0);
    const navigate =useNavigate();

    const handleAddressChange = (event) => {
        setAddress(event.target.value); 
    }
    const handleNameChange = (event) => {
        setName(event.target.value); 
    }
    const handleGenderChange = (event) => {
      setGender(event.target.value); 
    };
  const handleCnicChange=(event)=>{
    setCnic(event.target.value)
  }
  const handleBloodChange=(event)=>{
    setBlood(event.target.value)
  }
  const handleChangePm=(event)=>{
    setPm(event.target.value)
  }
  const handleAgeChng=(event)=>{
    setAge(event.target.value)
  }
  useEffect(() => {
    console.log(Age)
    getAgeGroup();
    getId();
}, [Age]);

  const getAgeGroup=()=>{
    if (Age <= 18) {
        setAgeGrp('Child'); 
    } else if (Age <= 40) {
        setAgeGrp('Adult'); 
    } else {
        setAgeGrp('Senior'); 
    }
  }
  const  save_Patient= async (id,Name,Age,gender,address,Bloodgrp,CNIC,Pm,PersonId,ageGrp)=>{
    try {
      const response = await axios.post('http://localhost:4000/saveInPateint', {
        params: {
            id:id,
            name: Name,
            age: Age,
            gender:gender,
            address:address,
            blood:Bloodgrp,
            cnic:CNIC,
            pm:Pm,
            person:PersonId,
            grp:ageGrp
        }
      });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const  getId= async ()=>{
    try {
      const response = await axios.post('http://localhost:4000/getpatIds');
      console.log(response.data.PatId)
      setId(response.data.PatId[0].patientid);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
  const handleSubmit=()=>{
    const PersonId = localStorage.getItem("_id");
    const newid=id+1;
    save_Patient(newid,Name,Age,gender,address,Bloodgrp,CNIC,Pm,PersonId,ageGrp);
    navigate("/Appointment");
  }
    return(
        <div className='Quest'>
            <PatientNav/>
            <div class="loader">
                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>
            </div>

            <div className="wraperB">
                <div className="Ld">
                   <h2>Welcome.We hope you are feeling good.</h2> 
                   <p>If not then we are here to make you feel better.</p>
                   <h4>So give us more information about yourself</h4>
                </div>

                <div className="Rd">
                <div class="flex flex-col items-center justify-center h-screen dark">
                    <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-bold text-gray-200 mb-4">Information</h2>
                        {/* <form class="flex flex-col"> */}
                        <div class="flex flex-col">
                        <div class="flex space-x-4 mb-4">
                            <input
                            placeholder="First Name"
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            required
                            value={Name}
                            onChange={handleNameChange}
                            />
                             <select
                                    class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="gender"  
                                     required
                                     value={gender}
                                     onChange={handleGenderChange} //
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                             </select>
                        </div>
                        <input
                            placeholder="Address"
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            required
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                        />
                        <label class="text-sm mb-2 text-gray-200 cursor-pointer" for="gender"   required>
                                 CNIC
                            </label>
                        <input
                            placeholder="XXXXX-XXXXXXX-X"
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" 
                            data-inputmask="'mask': '99999-9999999-9'" 
                            name="cnic"
                            minLength = "13"
                            required
                            value={CNIC}
                            onChange={handleCnicChange}
                        />
                         <label class="text-sm mb-2 text-gray-200 cursor-pointer" for="blood"   required>
                                 Blood Group
                        </label>
                        <select
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="blood"  
                             required
                             value={Bloodgrp}
                             onChange={handleBloodChange}
                        >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>
                        <label class="text-sm mb-2 text-gray-200 cursor-pointer" for="method"   required>
                                 Payment Method
                        </label>
                        <select
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="method"  
                             required
                             value={Pm}
                             onChange={handleChangePm}
                        >
                            <option value="card">Card</option>
                            <option value="Cash">Cash</option>
                        </select>
                     
                        <input
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                            placeholder="Age"
                            type="number"
                            required
                            value={Age}
                            onChange={handleAgeChng}
                        />
                        <button
                            class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        {/* </form> */}
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default AddPatient;