import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PatientNav from "./patientNav";

const PatFirst=()=>{
    return(
        <div>
			<PatientNav/>
            <div className="body">
                <img className="Pimg" src="./images/drnew.jpg" alt="Doctor"/>
            </div>
            
        </div>
    );
}
export default PatFirst;