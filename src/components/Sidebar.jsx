import React from 'react'
import { useNavigate } from 'react-router'


const Sidebar = () => {
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
      <li >Inbox</li>
        <li>Unread</li>
        <li>Starred</li>
        <li>Drafts</li>
        <li>Sent</li>
        <li>Delete Items</li>
      </ul>
        
    </div>
    )
}

export default Sidebar