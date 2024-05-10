import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
const AdminFirst=()=>{
    return(
        <div>
			<AdminNav/>
            <div className="body">
                <img className="Pimg" src="./images/bcAdm.jpg" alt="Doctor"/>
            </div>
            
        </div>
    );
}
export default AdminFirst;