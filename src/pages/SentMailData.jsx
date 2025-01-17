import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMailData, sentMailData } from '../slices/mail-action'


const SentMailData = () => {
    
    const dispatch = useDispatch()
    const sentMail = useSelector((state)=>state.mail.mailArr)


  useEffect(()=>{
  dispatch(sentMailData())
  },[])



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
      

    <div
    className={`h-2 w-2 rounded-full mt-2 mr-4 ${
      mail.read ? "bg-gray-500" : "bg-orange-400"
    }`}
    ></div>

      <div className='w-[20%]'>{mail.reciver}</div>
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

export default SentMailData