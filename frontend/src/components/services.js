import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "./Navbar";
const services=()=>{
    return(
		<div className='mainConfirmApp'> 
		<Navbar/>
		<div className="loader">
			<div className="loaders"></div>
			<div className="loaders"></div>
			<div className="loaders"></div>
			<div className="loaders"></div>
			<div className="loaders"></div>
			<div className="loaders"></div>
			<div className="loaders"></div>
			<div className="loaders"></div>
		</div>

        <div className='mainDiv'>
			<div className='ser'>
			<h3 class="h31">Why Choose CareCove?</h3>
			<ol>
				<li><strong>Data-Driven Insights:</strong>Access real-time data analysis and trends for informed decision-making.</li>
				<li><strong>Expert Analysis:</strong>Benefit from the expertise of healthcare professionals and data analysts.</li>
				<li><strong>Customized Reports:</strong>Generate personalized reports and analytics tailored to your needs.</li>
				<li><strong>Secure Platform: </strong>Rest assured with our secure and compliant data handling practices.</li>
			</ol>
			</div>
	<div className="services-container"> 
		<div className="service-card"> 
			<div className="icon-container"> 
				<i className="fa fa-medkit" aria-hidden="true"></i>

			</div> 
			<h5 className="medical">Primary Care</h5>
            <p className="ourMedicalServices"> Comprehensive primary care services for individuals and families, including routine check-ups, vaccinations. Our team of experienced physicians is dedicated to promoting your overall health and well-being.</p>
			 
		</div> 

		<div className="service-card"> 
			<div className="icon-container"> 
				<i className="fa fa-users" aria-hidden="true"></i>

			</div> 
            <h5 className="indi"> Specialized Treatments</h5>
            <p className="we_offer">Advanced medical treatments tailored to address specific health conditions, managed by experienced specialists. We offer personalized care plans to ensure the best outcomes for patients.</p>
		</div> 


		<div className="service-card"> 
			<div className="icon-container"> 
				<i className="fa fa-plus-square" aria-hidden="true"></i>

			</div> 
            <h5 className="medicaid">Emergency Service</h5>
            <p className="our_med"> Rapid-response emergency medical services available 24/7 for immediate care in critical situations. Our skilled medical staff is equipped to handle a wide range of medical emergencies. </p>

            </div> 
	</div> 

        </div>
		</div>

    );
}
export default services;