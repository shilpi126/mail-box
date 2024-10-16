import Login from "./pages/Login";
import MailBox from "./pages/MailBox";
import Signup from "./pages/Signup";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"

function App() {
  const token = localStorage.getItem("token") || ""
  return (
    <BrowserRouter>
   <Routes>
   <Route path="/" element={token? <MailBox/> : <Navigate to="/login"/>}/>
    <Route path="/signup" element={ <Signup/>}/> 
    <Route path="/login" element={<Login/>}/>
   
   </Routes>
  
    </BrowserRouter>
  );
}

export default App;
