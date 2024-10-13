import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Signup from './Signup'
// import axios from 'axios'

// // Mock axios to prevent actual network requests
// jest.mock('axios')


describe("Signup Component", () => {
    //test for rendring component
    test('renders Signup component with form elements', () => {
        render(<Signup />)
        expect(screen.getByText("Sign Up")).toBeInTheDocument()
        expect(screen.getByLabelText("Email")).toBeInTheDocument()
        expect(screen.getByLabelText("Password")).toBeInTheDocument()
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument()
    })

    //test for  invalid input
    test('displays an error when email is invalid', () => {
        render(<Signup />)
        const emailInput = screen.getByLabelText(/Email/i)
        
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
        fireEvent.blur(emailInput)
        fireEvent.click(screen.getByText(/Submit/i))
        
        expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
    })


    //test for short password
    test('displays an error when password is too short', () => {
        render(<Signup />)
        const passwordInput = screen.getByLabelText("Password")
      
        fireEvent.change(passwordInput, { target: { value: '123' } })
        fireEvent.click(screen.getByText("Submit"))
      
        expect(screen.getByText("Password must be longer than 6 characters.")).toBeInTheDocument()
      })


      //test for password missmatch
      test('displays an error when passwords do not match', () => {
        render(<Signup />)
        const passwordInput = screen.getByLabelText("Password")
        const confirmPasswordInput = screen.getByLabelText("Confirm Password")
      
        fireEvent.change(passwordInput, { target: { value: '1234567' } })
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } })
        fireEvent.click(screen.getByText("Submit"))
      
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument()
      })




// test('submits form successfully with valid data', async () => {
//     axios.post.mockResolvedValue({ data: { email: 'test@example.com' } })
  
//     render(<Signup />)
//     const emailInput = screen.getByLabelText("Email")
//     const passwordInput = screen.getByLabelText("Password")
//     const confirmPasswordInput = screen.getByLabelText("Confirm Password")
  
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
//     fireEvent.change(passwordInput, { target: { value: '1234567' } })
//     fireEvent.change(confirmPasswordInput, { target: { value: '1234567' } })
  
//     fireEvent.click(screen.getByText("Submit"))
  
//     // Expect axios to have been called with correct arguments
//     expect(axios.post).toHaveBeenCalledWith(
//       expect.stringContaining('https://identitytoolkit.googleapis.com/v1/accounts:signUp'),
//       { email: 'test@example.com', password: '1234567', returnSecureToken: true }
//     )
//   })


})
