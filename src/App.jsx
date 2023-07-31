import Login from "./pages/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/emailverification" element={<EmailVerification/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Home/>} />

      </Routes>
    </Router>
     
   
  );
}

export default App;
