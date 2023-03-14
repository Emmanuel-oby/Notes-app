import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { showRedMessage } from "../../redux/features/toast/toastSlice";
import Toast from "../toast/Toast";
import "./auth.scss";
import leftImage from "../../assets/Saly-3.png";
import rightImage from "../../assets/Saly-2.png";

export default function SignIn() {
  const { DrawerScreen } = useSelector((state) => state.side);
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(details);
    if(!/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(details.email)){
      <Toast/>
      return
    }
    fetch("/api/users", {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name: details.username,
        email: details.email,
        password: details.password
      })
    }).then(res => res.json())
    .then(data => console.log(data))
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
                value={details.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Enter your Email</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={details.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Enter your Password</label>
              <input
                type="password"               
                placeholder="Password"
                name="password"
                value={details.password}
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
