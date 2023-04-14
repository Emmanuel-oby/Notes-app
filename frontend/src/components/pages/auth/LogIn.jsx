import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { showRedMessage } from "../../../redux/features/toast/toastSlice";
import "./auth.scss";
import leftImage from "../../../assets/note-man.png";
import rightImage from "../../../assets/Group 1.png";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
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
      dispatch(showRedMessage("Email format is not correct"));
      return
    }
    fetch("/api/users/login", {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email: details.email,
        password: details.password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.message){
        dispatch(showRedMessage(data.message));
      } else {
        navigate("/")
      }
    }).catch(err => console.log(err))
  };

  return (
    <div className="background">
      <div className="first-half">
        <div className="img-cont">
          <img src={leftImage} alt="boy holding notes" />
        </div>
      </div>
      <div className="second-half">
        <div className="img-cont">
          <img src={rightImage} alt="girl operating phone" />
        </div>
      </div>
      <div className="container">
        <div className="container-inner">
          <div className="form-intro">
            <div>
              <p>
                Welcome to <span>My Notes</span>
              </p>
              <h1>Log In</h1>
            </div>
            <div>
              <p>Don't have an account?</p>
              <p>
                <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
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
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
