import React from 'react';
import Navbar from './Navbar';
const testimonials=()=>{
    return(
        <div>
            <Navbar/>
             <h2 class="testimonial-heading">Testimonials</h2>
            <div class="testimonial-container">
                <div class="testimonial">
                    <div class="testimonial-content">
                        <p>The care I received was exceptional. From the moment I walked in, I
                            felt welcomed and cared for. The staff went above and beyond to ensure
                            my comfort and well-being</p>
                        <span class="author">- Ahmad</span>
                    </div>
                    <img src="./images/pic1.jpeg" alt="Ahmad" class="avatar"/>
            </div>
            <div class="testimonial">
                <div class="testimonial-content">
                    <p>I recently visited for an emergency medical issue, and I was blown
                        away by the efficiency and professionalism of the staff.</p>
                    <span class="author">- Uzair</span>
                </div>
                <img src="./images/pic2.jpeg" alt="Uzair" class="avatar"/>
            </div>
            <div class="testimonial">
                <div class="testimonial-content">
                    <p>As a long-time patient of CareCove, I have always been
                        impressed by the quality of care and attention to detail provided by
                        the medical team</p>
                    <span class="author">- Leena</span>
                </div>
                <img src="./images/pic3.jpeg" alt="Leeena" class="avatar"/>
            </div>
         </div>
        </div>
    );
}
export default testimonials;