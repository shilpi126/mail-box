import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
const api = require("../secret.js")


const Sidebar = (props) => {
  const userData = JSON.parse(localStorage.getItem("userData")) || ""
  const userEmail = userData.email;
  const user = userEmail.slice(0, userEmail.indexOf("@"))
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/composemail")
  }





 
 
 


  return (
    <div className='bg-slate-700 h-screen pl-4 pt-4'>
        <button className='bg-orange-800 h-8 w-40 text-center text-white' 
        onClick={handleClick}
        >Compose</button>
      <ul className='text-white'>
      <li className='w-[100%]  h-8 mt-2 bg-slate-600 flex justify-between'>
        <p>Inbox</p>
        <div className='text-center mr-2'>
          <p className='text-orange-500 text-xs'>{props.count}</p>
          <p className='text-xs'>unread</p>
        </div>
      </li>
        <li>Unread</li>
        <li>Starred</li>
        <li>Drafts</li>
        <li ><Link to="/sent">Sent</Link></li>
        <li>Delete Items</li>
      </ul>
        
    </div>
    )
}

export default Sidebar