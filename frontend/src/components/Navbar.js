import React from 'react';
import { useNavigate, Link } from "react-router-dom";

const Navbar=()=>{

    const navigate = useNavigate();
    const handleClick=()=>{
        navigate("/login");
    }

    const handleHome=()=>{
        navigate("/home");
    }

    const handleAboutUs=()=>{
        navigate("/aboutus");
    }

    const handleContactUs=()=>{
        navigate("/contactus");
    }

    const handleServices=()=>{
        navigate("/services");
    }

    const handleTestimonials=()=>{
        navigate("/testimonial");
    }


    const handleClickS=()=>{
        navigate("/register");
    }
    return(
        <div>
        <header>
            <section className="header-title">
                <h1 className='AppTitle'>CareCove</h1>
                <section className='NavbuttonSide'>

                <button className="btnlog" data-text="Awesome" onClick={handleHome}>
                    <span class="actual-text">&nbsp;Home&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;Home&nbsp;</span>
                </button>

                <button className="btnlog" data-text="Awesome" onClick={handleServices}>
                    <span class="actual-text">&nbsp;Services&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;Services&nbsp;</span>
                </button>

                <button className="btnlog" data-text="Awesome" onClick={handleAboutUs}>
                    <span class="actual-text">&nbsp;AboutUs&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;AboutUs&nbsp;</span>
                </button>

                <button className="btnlog" data-text="Awesome" onClick={handleContactUs}>
                    <span class="actual-text">&nbsp;ContactUs&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;ContactUs&nbsp;</span>
                </button>

                <button className="btnlog" data-text="Awesome" onClick={handleTestimonials}>
                    <span class="actual-text">&nbsp;Testimonials&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;Testimonials&nbsp;</span>
                </button>

                <button className="btnlog" data-text="Awesome" onClick={handleClick}>
                    <span class="actual-text">&nbsp;Login&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;Login&nbsp;</span>
                </button>

                <button className="btnlog" data-text="Awesome" onClick={handleClickS}>
                    <span class="actual-text">&nbsp;SignUp&nbsp;</span>
                    <span aria-hidden="true" class="hover-text">&nbsp;SignUp&nbsp;</span>
                </button>
                </section>
            </section>
        </header>
        <div className='home'>
            {/* <Home/> */}
        </div>
        </div>
    );
}
export default Navbar;