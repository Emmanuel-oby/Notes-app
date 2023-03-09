import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.scss";
import leftImage from "../../assets/Saly-3.png";
import rightImage from "../../assets/Saly-2.png";

export default function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <div className="background">
      <div className="first-half">
        <img src={leftImage} alt="leftImage" />
      </div>
      <div className="second-half">
        <img src={rightImage} alt="rightImage" />
      </div>
      <div className="container">
        <div className="container-inner">
          <div className="form-intro">
            <div>
              <p>
                Welcome to <span>My Notes</span>
              </p>
              <h1>Sign Up</h1>
            </div>
            <div>
              <p>Have an account?</p>
              <p>
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="form-control">
              <label>Enter your Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={state.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Enter your Email</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Enter your Password</label>
              <input
                type="password"               
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label></label>
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
