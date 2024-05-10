import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PatientNav from "./patientNav";

const Patient = () => {
	const navigate = useNavigate();

	// const handleAppointment=()=>{
    //     navigate("/Appointment");
    // }

	const handleAppointment=()=>{
		navigate("/Questionarie");
	}

  return (
	
    <div className="ptBd">
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
	  <div className="patMain">
		<p className="Instructions">We are here for your service. Hope you will get better after using our service.If you find any inconvenience do contact us and submit your Query  </p>

		<button class="btn" onClick={handleAppointment}>
			<span class="btn-text-one">GET AN APPOINTMENT</span>
			<span class="btn-text-two">Lets Go!</span>
		</button>
	  </div>
	</div>
  );
};

export default Patient;