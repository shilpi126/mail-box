import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

import axios from 'axios'
const api = require("../secret.js")

const InboxMail = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || ""
  const userEmail = userData.email;
  const user = userEmail.slice(0, userEmail.indexOf("@"))
  const [allMail, setAllMail]= useState([]);


  const getMail = async(mailData) => {
    try{
      const response = await axios.get(`${api}/${user}.json`)
      const data = await response.data;

    let mailArr=[];

      for(const key in data){
        let newMail = {
          "key":key,
          "content":data[key].content,
          "time":data[key].time,
          "subject":data[key].subject,
          "send":data[key].send,
          "reciver":data[key].reciver,
          "read":data[key].read,
          "starred":data[key].starred,
          "sender":data[key].sender,
          "receive":data[key].receive,
        };

        mailArr.push(newMail)
        
      }
      
      setAllMail([...mailArr])
      
    }catch(err){
      console.log(err.message)
    }
  }



  useEffect(()=>{
    getMail()
  },[])

  return (
    <div>
        <Header/>
      <div className='flex'>
      <div className='w-[20%]'>
        <Sidebar/>
        </div>
        <div className='w-[80%] m-4'>
      {allMail.map((mail) => (
          <div key={mail.key} className='flex border-b-2 border-b-slate-200'>
          <div className='w-[20%]'>{mail.sender}</div>
          <div className='w-[70%]' 
          dangerouslySetInnerHTML={{__html:mail.content}}
          />
          
          <div className='w-[10%]'>{mail.time}</div>
          </div>
      ))}
        </div>
      </div>
    </div>
  )
}

export default InboxMail