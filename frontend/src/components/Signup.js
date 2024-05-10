import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleRegister } from "../utils/resource";
import Navbar from "./Navbar";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.trim() && password.trim() && email.trim()) {
			handleRegister(email, username, password, navigate);
			setPassword("");
			setUsername("");
			setEmail("");
		}
	};

	return (
		<div className="kkk">
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
		<div className="hehe">
			<div className="content">
			<div className="logo"><img src="./images/hcc.png" alt="Doctor"/></div>
			<div className="flr">
			<div class="content2">
				<h1>Welcome to CareCove</h1>
				<p>CareCove is your go-to for in-depth healthcare data analysis, insights, and effective solutions. Join us to harness the transformative power of data in managing healthcare. Our trusted expertise ensures informed decisions and optimized outcomes. Unlock the potential of data-driven healthcare management with CareCove.
				</p>
           </div>
		   
        </div>
			</div>
	<div className="wrapper">
			<div class="form-wrapper sign-up">
		<form action="" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<div class="input-group">
			<input
				id='username'
				name='username'
				required
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label for="">Username</label>
			</div>
			<div class="input-group">
			<input
				id='email'
				name='email'
				type='email' required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label for="">Email</label>
			</div>
			<div class="input-group">
			<input
				id='password'
				type='password'
				name='password'
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<label for="">Password</label>
			</div>
			<button className="IUbutton">signup</button>
			<div className="signUp-link">
				<p style={{ textAlign: "center", marginTop: "30px" }}>
					Already have an account?{" "}
					<Link className='link' to='/login'>
						Sign in
					</Link>
				</p>
			</div> 
		</form>
		</div>
	</div>
	</div>
	</div>

);
};

export default Signup;
