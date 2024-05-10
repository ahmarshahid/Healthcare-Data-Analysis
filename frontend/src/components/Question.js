import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PatientNav from "./patientNav";
import axios from 'axios';
import { toast } from "react-toastify";

const Question=()=>{
    const[newpat,setNew]=useState("null");
    const navigate = useNavigate();
    const[pId,setPatId]=useState(0);
    const PersonId = localStorage.getItem("_id");

   const setInput=(value)=>{
     setNew(value);

   }
   const setInput2=(value)=>{
    setNew(value);
  }
  useEffect(()=>{
    getPatientId(PersonId);
  },[]);

  useEffect(() => {
    if(newpat !=null || newpat !=""){
        if(newpat==="New Patient"){
            navigate("/AddPatient");
        }
        if(newpat==="Returning Patient"){
            checkExistance(pId)
        }
    }
    }, [newpat]);

    const getPatientId = async (personId) => {
        try {
          const response = await axios.post('http://localhost:4000/patientId', {
            params:{
                personId: personId 
        }});
          setPatId(response.data.patId);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }

    const  checkExistance= async (PersonId) => {
        try {
            console.log("ppp"+PersonId)
            const response = await axios.post("http://localhost:4000/check", {
                params:{
                    personId: PersonId 
            }});
            if (response.data.error_message) {
                toast.error(response.data.error_message);
            } else {
                toast.success(response.data.message);
                navigate("/Appointment");
            }
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
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
            <div className='wraperB'>
                <div className='left'>
                    <h1 className='head1'>Start your appointment request here.</h1>
                    <p className='para'>Easiest way to reach us</p>
                </div>
                <div className='right'>
                <h2 className='hd'>Tell us more</h2>

                    <div>
                    <label className="label2">
                        <input 
                            value={"New Patient"} 
                            name="value-radio2" 
                            className="radio-input2" 
                            type="radio" 
                            onChange={(e) => setInput("New Patient")} // Pass item directly to setInput
                        />
                        <div className="radio-design2"></div>
                        <div className="label-text2">{"New Patient"}</div>
                    </label>
                    </div>
                    <div>
                    <label className="label2">
                        <input 
                            value={"Returning Patient"} 
                            name="value-radio2" 
                            className="radio-input2" 
                            type="radio" 
                            onChange={(e) => setInput2("Returning Patient")} // Pass item directly to setInput

                        />
                        <div className="radio-design2"></div>
                        <div className="label-text2">{"Returning Patient"}</div>
                    </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Question;