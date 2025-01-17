import React from "react";
import MassageDetailsPage from "./components/MassageDetailsPage";
import InboxMail from "./pages/InboxMail";
import Login from "./pages/Login";
import MailBox from "./pages/MailBox";
import SentMailData from "./pages/SentMailData";
import Signup from "./pages/Signup";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Notification from "./components/Notification";
import { useSelector } from "react-redux";

function App() {
  const token = localStorage.getItem("token") || ""
  const notification = useSelector((state)=>state.mail.notification)
  return (
    <BrowserRouter>
    
  {notification.status && <Notification
    status={notification.status}
    title={notification.title}
    message={notification.message}
    />}
   <Routes>
   <Route path="/" element={token? <InboxMail/> : <Navigate to="/login"/>}/>
   <Route path="/composemail" element={token? <MailBox/> : <Navigate to="/login"/>}/>
    <Route path="/signup" element={ <Signup/>}/> 
    <Route path="/login" element={<Login/>}/>
    <Route path="/msg/:id" element={<MassageDetailsPage/>}/>
    <Route path="/sent" element={<SentMailData/>}/>
    
  </Routes>
  
    </BrowserRouter>
  );
}

export default App;
