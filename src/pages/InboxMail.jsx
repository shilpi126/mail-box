import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

import axios from 'axios'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { mailAction } from '../slices/mailSlice.js'
const api = require("../secret.js")

const InboxMail = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || ""
  const userEmail = userData.email;
  const user = userEmail.slice(0, userEmail.indexOf("@"))
  const [countUnread, setCountUnread] = useState(0)
  const userMail = useSelector((state) => state.mail.mailArr)
  console.log(userMail)
  const dispatch = useDispatch()
  let count =0;

  const getMail = async() => {
    try{
      const response = await axios.get(`${api}/${user}.json`)
      const data = await response.data;

      dispatch(mailAction.getMail(data))
      
    }catch(err){
      console.log(err.message)
    }
  }



  const countUnReadMsg = () => {
  
    for(let i=0; i<userMail.length; i++){
      //console.log(userMail[i])
      if(userMail[i].read === false){
        count++;
        setCountUnread(count)
      }
    }
      
  }
  
  console.log(countUnread)


  useEffect(()=>{
    countUnReadMsg()
    getMail()
  },[])


  const handleDeleteMail =async (id) =>{
    //console.log(id)
    try{
      const response = await axios.delete(`${api}/${user}/${id}.json`)
      const data = await response.data;
      console.log(data)
      dispatch(mailAction.deleteMail(id))
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div>
        <Header/>
      <div className='flex'>
      <div className='w-[20%]'>
        <Sidebar count={countUnread}/>
        </div>
        <div className='w-[80%] m-4'>
      {userMail.map((mail,index) => (
        <div key={index} className='flex justify-between'>
        <Link to={`/msg/${mail.key}`} >

          <div   className='flex border-b-2 border-b-slate-200'>
          {/* <div className={`h-2 w-2  rounded text-center mt-2 mr-4  ${mail.read?"bg-orange-500":"bg-orange-500" }}`></div> */}

        <div
        className={`h-2 w-2 rounded-full mt-2 mr-4 ${
          mail.read ? "bg-gray-500" : "bg-orange-400"
        }`}
        ></div>

          <div className='w-[20%]'>{mail.sender}</div>
          <div className='w-[70%]' 
          dangerouslySetInnerHTML={{__html:mail.content}}
          />

          <div className='w-[10%]'>{mail.time}</div>
        
          </div>
          </Link>
          <button  onClick={()=>{handleDeleteMail(mail.key)}} className='w-18 h-6 bg-orange-500 text-white'>delete</button>
          
          
          </div>
      ))}
        </div>
      </div>
    </div>
  )
}

export default InboxMail