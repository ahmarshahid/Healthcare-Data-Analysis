import React from 'react';
import Navbar from "./Navbar";
const Contact=()=>{
    return(
        <div>
            <Navbar/>
       
        <div className="holder">
            
        <h2 className="h">Contact Us</h2>
        <form action="#" method="POST">
            <div className="form-group">
                <label className="h" for="name">Name:</label>
                <input className='conIn' type="text" id="name" name="name" required/>
            </div>
            <div className="form-group">
                <label className="h" for="email">Email:</label>
                <input className='conIn' type="email" id="email" name="email" required/>
            </div>
            <div className="form-group">
                <label className="h" for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button className='buttonSub' type="submit">Submit</button>
        </form>
    </div>
    </div>
    );
}
export default Contact;