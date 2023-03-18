import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";

function App() {
  return (
    <>
      {/* <Header/>
    <Body/> */}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
