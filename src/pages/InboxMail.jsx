import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

import axios from 'axios'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { mailAction } from '../slices/mailSlice.js'
import useFetch from '../customHooks/useFetch.js'
import { deleteMailData, fetchMailData } from '../slices/mail-action.js'
const api = require("../secret.js")

const InboxMail = () => {
  const userMail = useSelector((state) => state.mail.mailArr)
  const dispatch = useDispatch()
  



  //useFetch(api,user)



  


  useEffect(()=>{
  dispatch(fetchMailData())
  },[])


  //setTimeout(()=>{
    //getMail()
  //},2000)


 

  return (
    <div>
        <Header/>

      <div className='flex'>
      <div className='w-[20%]'>
        <Sidebar/>
        </div>
        <div className='w-[80%] m-4'>
      {userMail && userMail.map((mail,index) => (
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
          <button  onClick={()=>{dispatch(deleteMailData(mail.key))}} className='w-18 h-6 bg-orange-500 text-white'>delete</button>
          
          
          </div>
      ))}
        </div>
      </div>




      
    </div>
  )
}

export default InboxMail