import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  EditorState } from 'draft-js';
import { useNavigate } from 'react-router';

import {useDispatch} from  "react-redux"
import { composeMailData } from '../slices/mail-action';




const MailBox = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || ""
  const userEmail = userData.email;
  const dispatch = useDispatch()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const navigate = useNavigate()
  const [to,setTo]=useState("")
  const [subject,setSubject]=useState("")
  const [content, setContent]=useState("")
  
  localStorage.setItem("senderEmail",JSON.stringify(to))

  
  const onEditorStateChange = (newState) => {
  
    setEditorState(newState)
    const content= draftToHtml(convertToRaw(newState.getCurrentContent()))
    setContent(content)
  }

  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if(!to) {
      alert("All fields are required!")
      return;
    }

    const mailData = {
      sender:userEmail,
      reciver:to,
      subject:subject,
      content:content,
      time:new Date(),
      read:false,
      starred:false,
      send:true,
      receive:false,
    }
  
    dispatch(composeMailData({mailData}))
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
              value={to}
              onChange={(e) => {
                setTo(e.target.value)
                
              }}
              required
              />
            </div>

            <div className='border-b-2 border-b-gray-200 h-8'>
              <label htmlFor='subject'>Subject</label>
              <input type='text'
              id='subject'
              placeholder='Enter subject'
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
                
              }}
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
    <button onClick={() =>{navigate("/")}}  className='h-[100%] w-[100%]'>x</button>
    </div>

    </div>
  )
}



export default MailBox