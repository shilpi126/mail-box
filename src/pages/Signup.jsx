import React, { useState } from 'react'
import { Input, Label } from '../UI/Input'
import Button from '../UI/Button'
import axios from "axios"
import { Link } from 'react-router-dom'
const API_KEY = " AIzaSyDx8j0xIWbpWXGgSWOCqFCU4tGyOV8Or_Q"
//const axios = require('axios');

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors , setErrors] = useState({})
    //const [isValid, setIsValid] = useState(false)

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
  
    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }))
            return false
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: null }))
            return true
        }
    }

    const isFormValidate = () => {
        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()
        const isConfirmPasswordValid = validateConfirmPassword()

        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            //setIsValid(true)
            return true
        } else {
            //setIsValid(false)
            return false
        }
    }

    const handleFormSubmit = async(event) => {
        event.preventDefault()
        try{
        if (isFormValidate()) {
            
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
                email,
                password,
                returnSecureToken:true,
            })
            
            
            if(!response.ok) {
                throw new Error("something went wrong!")
            }

            console.log(response.data)


        } else {
            throw new Error("Form is invalid. Please fix errors.")
        }
        }catch(err){
        console.log(err.message)
        }

        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }




  return (
    <React.Fragment>
       <div className='bg-slate-950 p-10 w-screen h-screen flex justify-center flex-col items-center'>
       <h1 className='text-center text-2xl text-white mb-4 uppercase'>Sign Up</h1>
        <form onSubmit={handleFormSubmit} className='bg-slate-900 w-98 h-auto  p-8 rounded-lg'>
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

            <div className='mb-1  h-24'>
            <Label
            htmlFor="confirmPassword"
            label="Confirm Password"
            className="text-white font-small"
            />
            <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => {
            setConfirmPassword(event.target.value)
            }}
            placeholder="Enter Confirm Password..."
            className="mt-1  h-10 w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
            />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
            <Button type="submit" text="Submit"   className="w-full mt-2 h-12 text-xl  font-medium   bg-orange-600 text-white font-bold rounded-lg hover:bg-slate-600  transition duration-300"/>
            
            
            </form>
            <div>
                
                <p className='text-white mt-4'>Already Have Account ? <Link to="/login">Login</Link></p>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Signup