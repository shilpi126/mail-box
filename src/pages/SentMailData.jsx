import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mailAction } from '../slices/mailSlice'
import { useDispatch, useSelector } from 'react-redux'
const api = require("../secret")

const SentMailData = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || ""
    const userEmail = userData.email;
    const user = userEmail.slice(0, userEmail.indexOf("@"))
    const dispatch = useDispatch()
    const sentMail = useSelector((state)=>state.mail.sentMsg)


    
    const senderMail = async() => {

    try{
      const response = await axios.get(`${api}/${user}.json`)
      const data = await response.data;
      console.log(data);
      dispatch(mailAction.sentMail(data))

    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
senderMail()
  },[])


  const handleDeleteMail =async (id) =>{
    //console.log(id)
    try{
      const response = await axios.delete(`${api}/${user}/${id}.json`)
      const data = await response.data;
      console.log(data)
      //dispatch(mailAction.deleteMail(id))
    }catch(err){
      console.log(err)
    }

  }
  return (
    <div>

  <div className='flex'>
  <div className='w-[20%]'>

    </div>
    <div className='w-[80%] m-4'>
  {sentMail?.map((mail,index) => (
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

export default SentMailData