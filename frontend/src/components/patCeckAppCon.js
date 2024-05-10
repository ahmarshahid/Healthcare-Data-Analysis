import {React,useState,useEffect} from 'react';
import axios from 'axios';
import PatientNav from "./patientNav";

const PatientConfirmAppCheck=()=>{
    return(
        <div className='mainConfirmApp'>
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

        </div>
    );

}
export default PatientConfirmAppCheck;