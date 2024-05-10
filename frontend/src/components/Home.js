import React from 'react';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home=()=>{

    const navigate=useNavigate();
   
 return(
    <div className='Sm'>
        <Navbar/>
        
         <div className="main">
        <div className="leftDiv">
            <h5 className="expert">Expert Medical Treatment</h5>
            <p className="weFollow">We believe in personalized care tailored to your needs.</p>
            <p className="weFollow">Experience compassionate healthcare at every visit.</p>
            <h5 className="expert">Your Health is Our Priority</h5>
            <a href="aboutus" className="btn">Learn More </a>
        </div>
        <div className="rightDiv">
            <img className="docImg" src="./images/g.jpg" alt="Doctor Image"/>
        </div>
</div>
    </div>

    );
}
export default Home;