import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DocNav from "./docNav";

const DocFirst=()=>{
    return(
        <div>
			<DocNav/>
            <div className="body">
                <img className="Dimg" src="./images/1.jpg" alt="Doctor"/>
            </div>

        </div>
    );
}
export default DocFirst;