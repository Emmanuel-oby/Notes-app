import "./App.scss";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import LogIn from "./components/auth/LogIn";

function App() {
  return (
    <>
      {/* <Header/>
    <Body/> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
