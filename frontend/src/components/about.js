import React from 'react';
import Navbar from "./Navbar";

const About=()=>{
    return(
    <div>
        <Navbar/>
         <br className="abt_line"/>
        <section className="about">
            <div className='img_div'>
                <img className="imgg" src="./images/about.jpeg" alt=""/>
            </div>
    
            <div className='text_div'>
         
                <h2> A dedicated doctor with the <br/>core mission to help</h2>
                <p>We are dedicated to serving our community with<br/> compassion, excellence, and innovation.</p>
                <p className="year"> Since 2024, we have been committed to providing <br/>high-quality
                    healthcare services tailored to the unique<br/> needs of our patients.</p>
                <span className="ceo">Shahid Brothers brings a wealth of experience and a<br/> passion
                        for healthcare excellence to our organization</span>
            </div>
        </section>
    </div>
    );
}
export default About;