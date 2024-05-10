import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleLogin } from "../utils/resource";
import Navbar from "./Navbar";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (username.trim() && password.trim()) {
			e.preventDefault();
			handleLogin(username, password,navigate);
			setPassword("");
			setUsername("");
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
    <div className="form-wrapper sign-in">
      <form action="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
		  <input
			id='username'
			name='username'
			type='text' required
			value={username}
			onChange={(e) => setUsername(e.target.value)}
		/>
          <label for="">Username</label>
        </div>
        <div className="input-group">
		<input
			id='password'
			type='password' required
			name='password'
			value={password}
			onChange={(e) => setPassword(e.target.value)}
		/>
          <label for="">Password</label>
        </div>
		<div class="forgot">
				<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
		</div>
       <button className="IUbutton">login</button>
        <div className="signUp-link">
		<p style={{ textAlign: "center", marginTop: "30px" }}>
				Don't have an account?{" "}
				<Link className='link' to='/register'>
					Create one
				</Link>
			</p>
        </div>
      </form>
    </div>
	</div>
	</div>
	</div>);
};

export default Login;
