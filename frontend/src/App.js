import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Land from "./components/pages/land/Land";
import Home from "./components/pages/home/Home";
import SignUp from "./components/pages/auth/SignUp";
import LogIn from "./components/pages/auth/LogIn";
import CreateNote from "./components/pages/createNote/CreateNote";
import Toast from "./components/toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import { saveUser } from "./redux/features/user/userSlice";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { open } = useSelector((state) => state.toast);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user){
      dispatch(saveUser(user))
      navigate("/home")
    }else{
      navigate("/")
    }
  }, [])
  
  return (
    <>
    <div className="app">
      <Navbar />
      <Routes className="route">
        <Route path="/" element={<Land />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CreateNote" element={<CreateNote />} />
      </Routes>
      </div>
      {open && <Toast />}
    </>
  );
}

export default App;
