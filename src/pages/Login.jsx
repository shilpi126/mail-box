import React, { useEffect, useState } from 'react'
import { Input, Label } from '../UI/Input'
import Button from '../UI/Button'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
const API_KEY = " AIzaSyDx8j0xIWbpWXGgSWOCqFCU4tGyOV8Or_Q"


const Login = () => {
    const token = localStorage.getItem("token") || ""
console.log(token)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [errors , setErrors] = useState({})
    //const [isValid, setIsValid] = useState(false)


    useEffect(()=>{
        if(token){
            navigate("/")
        }
    },[])

    const validateEmail = () => {
        if (!email.includes("@")) {
            setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email address." }))
            return false
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: null }))
            return true
        }
    }
    
    const validatePassword = () => {
        if (password.trim().length <= 6) {
            setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be longer than 6 characters." }))
            return false
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: null }))
            return true
        }
    }



    const isFormValidate = () => {
        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()
        
        if (isEmailValid && isPasswordValid) {
            
            return true
        } else {
            
            return false
        }
    }

    const handleFormSubmit = async(event) => {
        event.preventDefault()
        try{
        if (isFormValidate()) {
            console.log(email,password)
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,{
                email,
                password,
                returnSecureToken:true,
            })
            
            console.log(response)

            if(response) {
                
                const data = response.data
                localStorage.setItem("userData",JSON.stringify(data))
                //console.log(data.idToken)
                localStorage.setItem("token",data.idToken)

            }


        } else {
            throw new Error("Form is invalid. Please fix errors.")
        }
        }catch(error){
        console.log(error.message)
        }

        setEmail("")
        setPassword("")
        
    }


  return (
    <React.Fragment>
    <div className='bg-slate-950 p-10 w-screen h-screen flex justify-center flex-col items-center'>
    <h1 className='text-center text-2xl text-white mb-4 uppercase'>Login</h1>
     <form onSubmit={handleFormSubmit} className='bg-slate-900 w-96 h-auto p-8 rounded-lg'>
     <div className='mb-1  h-24'>
         <Label
         htmlFor="email"
         label="Email"
         className="text-white font-small"
         />
         <Input
         id="email"
         type="email"
         
         value={email}
         placeholder="Enter Email..."
         onChange={(event) => {
            setEmail(event.target.value)
         }}
         className="mt-1  h-10 w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
         />
         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
         </div>

         <div className='mb-1  h-24'>
         <Label
         htmlFor="password"
         label="Password"
         className="text-white font-small"
         />
         <Input
         id="password"
         type="password"
         value={password}
         placeholder="Enter Password..."
         onChange={(event) => {
         setPassword(event.target.value)
         }
     }
         className="mt-1 h-10 w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
         />
  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
  </div>

     <Button type="submit" text="Submit"   className="w-full mt-2 h-12 text-xl  font-medium   bg-orange-600 text-white font-bold rounded-lg hover:bg-slate-600  transition duration-300"/>
         
     <p className='text-white text-center mt-4 '>Forgot Password</p>
    
         </form>
         <div>
             
             <p className='text-white mt-4'>Don't Have Account ? 
                <Link to="/signup">Sign up</Link> 
                </p>
         </div>
     </div>
 </React.Fragment>
  )
}

export default Login