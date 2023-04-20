import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Land from "./pages/land/Land";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import CreateNote from "./pages/createNote/CreateNote";
import Toast from "./components/toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import Note from "./pages/notes/Note";
import NotesCategory from "./pages/notesCategory/NotesCategory";
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
        <Route path="/notes/:noteid" element={<Note />} />
        <Route path="/notes/category/:category" element={<NotesCategory />} />
      </Routes>
      </div>
      {open && <Toast />}
    </>
  );
}

export default App;
