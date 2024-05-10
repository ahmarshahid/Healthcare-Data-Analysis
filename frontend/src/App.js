import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import BookUser from "./components/BookUser";
import Patient from "./components/patientDashboard";
import Home from "./components/Home";
import About from "./components/about";
import Contact from "./components/contactUs"
import Services from "./components/services";
import Testimonials from "./components/testimonials";
import Appointment from "./components/patientAppointment";
import SelectDoctor from "./components/selectorDoc";
import ConfirmAppointment from "./components/docConfirmAppointment";
import Question from "./components/Question";
import AddPatient from "./components/AddPatient";
import Meet from "./components/meet";
import DocFirst from "./components/DocFirst";
import PatFirst from "./components/PatFirst";
import Powerbi from "./components/powerbi";
import UpdateAvailability from "./components/updateAvv";
import PatientConfirmAppCheck from "./components/patCeckAppCon";
import AppointmenrDel from "./components/delAppReq";
import AddDoc from "./components/AdminAddDoc";
import AdminFirst from "./components/AdminFirst";
import DelDoc from "./components/docDel";
import './navbar.css';
import "./Home.css";
import "./doctorCss.css";
import "./about.css";
import "./contactUs.css";
import  "./services.css";
import "./testimonials.css";
import "./patientDashboard.css";
import "./admin.css"

const App = () => {
	return (
		<div>
			
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
          			<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/home' element={<Home />} />
					<Route path='/aboutus' element={<About />} />
					<Route path='/contactus' element={<Contact />} />
					<Route path='/services' element={<Services />} />
					<Route path='/testimonial' element={<Testimonials />} />
					<Route path='/patient/dashboard/' element={<Patient/>}/>
					<Route path='/Questionarie' element={<Question/>}/>
					<Route path='/AddPatient' element={<AddPatient/>}/>
					<Route path='/Appointment' element={<Appointment />} />
					<Route path='/new' element={<SelectDoctor/>}/>
					<Route path='/confirmAppointment' element={<ConfirmAppointment />} />
					<Route path='/Meet' element={<Meet/>} />
					<Route path='/DocFirst' element={<DocFirst/>} />
					<Route path='/updateAvv' element={<UpdateAvailability/>} />
					<Route path='/patFirst' element={<PatFirst/>} />
					<Route path='/patAppCheck' element={<PatientConfirmAppCheck/>} />
					<Route path='/patDelApp' element={<AppointmenrDel/>} />
					<Route path='/DocAdd' element={<AddDoc/>} />
					<Route path='/DocDel' element={<DelDoc/>} />
					<Route path='/AdminFirst' element={<AdminFirst/>} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/profile/:id' element={<Profile />} />
					<Route path='/book/:user' element={<BookUser />} />
					<Route path='/powerbi' element={<Powerbi />} />

				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
};

export default App;
