import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { showRedMessage, showGreenMessage } from "../../redux/features/toast/toastSlice";
import Toast from "../toast/Toast";
import "./auth.scss";
import leftImage from "../../assets/note-man.png";
import rightImage from "../../assets/Group 1.png";

export default function SignUp() {
  const { open } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(showRedMessage("Email format is not correct"));
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
    .then(data => {
      if(data.message){
        console.log(data);
        dispatch(showRedMessage(data.message));
      } else {
        dispatch(showGreenMessage("successfully signed up"))
        navigate("/login")
      }
    })
  };


  return (
    <div className="background">
      {
        open && (<Toast/>)
      }
      
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
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
