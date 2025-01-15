import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router'
const api = require("../secret")

const MassageDetailsPage = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || ""
    const userEmail = userData.email;
    const user = userEmail.slice(0, userEmail.indexOf("@"))
    
    const {id} = useParams()
    const mails = useSelector((state) => state.mail.mailArr)
    const navigate = useNavigate()
    const uniqueMail = mails.find((mail)=> mail.key === id)
    console.log(uniqueMail)

    const readMail = async() => {
        try{
          const response = await axios.patch(`${api}/${user}/${id}.json`,{...uniqueMail,read:true})
          const data = await response.data;
          console.log(data)
          
          
        }catch(err){
          console.log(err.message)
        }
      }


      useEffect(() => {
        readMail()
      },[])


    return (
    <div className='m-4'>
        <h1>Teast Message</h1>
        <div className='m-2 border-2 p-4 border-slate-400'>
         <div className='flex m-2 '>
            <img src='https://th.bing.com/th/id/OIP.ubSQVjUQ0MATRedUJvku6AHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7' width={30} height={30}/>
            <div className='text-red-700 ml-4' 
          dangerouslySetInnerHTML={{__html:uniqueMail?.sender}}
          />
         </div>
        <p  
          dangerouslySetInnerHTML={{__html:uniqueMail?.content}}
          />
        </div>
         <button type='click' onClick={()=>{navigate("/")}} className='bg-orange-700 text-white w-40 h-8'>back</button>
    </div>
    )
}

export default MassageDetailsPage