import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Land from "./components/pages/land/Land";
import Home from "./components/pages/home/Home";
import SignUp from "./components/pages/auth/SignUp";
import LogIn from "./components/pages/auth/LogIn";
import CreateNote from "./components/pages/createNote/CreateNote";
import Toast from "./components/toast/Toast";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";

function App() {
  const { open } = useSelector((state) => state.toast);
  return (
    <>
      {/* <Header/>
    <Body/> */}
    <div className="app">
      <Navbar />
      <Routes>
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
