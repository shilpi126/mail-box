import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import axios from "axios"
import draftToHtml from 'draftjs-to-html';
 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  EditorState } from 'draft-js';
import { useNavigate } from 'react-router';
import { mailAction } from '../slices/mailSlice';
import {useDispatch} from  "react-redux"



const api = require("../secret")



const MailBox = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || ""
  const userEmail = userData.email;
  const user = userEmail.slice(0, userEmail.indexOf("@"))
const dispatch = useDispatch()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    to:"",
    subject:"",
    content:"",
  })

  const senderEmail = formData.to.slice(0, formData.to.indexOf("@"))

  const handleChange = (e) => {
    const {id, value} = e.target;
    console.log(id, value)
    setFormData((prev) => ({...prev, [id]:value} ))
    
  }

  const onEditorStateChange = (newState) => {
    //console.log(newState)
    setEditorState(newState)
    setFormData({
      ...formData,
      content: draftToHtml(convertToRaw(newState.getCurrentContent()))
    })

  }


  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if(!formData.to) {
      alert("All fields are required!")
      return;
    }

    const mailData = {
      sender:userEmail,
      reciver:formData.to,
      subject:formData.subject,
      content:formData.content,
      time:new Date(),
      read:false,
      starred:false,
      send:true,
      receive:false,
    }
 
    //console.log("--->",mailData)
    
    sendMail(mailData);


  }




  const sendMail = async(mailData) =>{
    try{
      const res = await axios.post(`${api}/${senderEmail}.json`,mailData)
      console.log(res);
    }catch(err){
      console.log(err.message)
    }
  }






  const handleClick = () =>{
   navigate("/")
  }


  
  return (
    <div className='m-8 ml-20 mr-20 bg-white  h-screen flex justify-between'>
    <div  className='p-4 h-[90%] w-[100%] border-2 border-gray-300'>
        <form onSubmit={handleFormSubmit} className='h-[100%]'>
        <div className='  h-[90%]'>
          <div className='h-[15%]'>
            <div className='border-b-2 border-b-gray-200 h-8'>
              <label htmlFor='to'>To</label>
              <input type='email'
              id='to'
              placeholder='Enter email address'
              value={formData.to}
              onChange={handleChange}
              required
              />
            </div>

            <div className='border-b-2 border-b-gray-200 h-8'>
              <label htmlFor='subject'>Subject</label>
              <input type='text'
              id='subject'
              placeholder='Enter subject'
              value={formData.subject}
              onChange={handleChange}
              />
            </div>
            
          </div>

          
          <div className='relative h-[80%] w-[100%]  bg-white'>
            
            <Editor
            
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"

              
              onEditorStateChange={onEditorStateChange}
            />

      
          </div>


        </div>
        <div className='h-[10%] '>
          <button  type='submit' className='bg-blue-700 h-8 w-24 mt-2 text-white'>Send</button>
        </div>
        </form>
        
      
    </div>

<div className='mr-4 w-10 h-10 bg-slate-400'>
<button onClick={handleClick}  className='h-[100%] w-[100%]'>x</button>
</div>

    </div>
  )
}



export default MailBox