import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Login from './Login'




describe("Login Component", () => {
    //test for rendring component
    test('renders Login component with form elements', () => {
        render(<Login />)
        expect(screen.getByText("Login")).toBeInTheDocument()
        expect(screen.getByLabelText("Email")).toBeInTheDocument()
        expect(screen.getByLabelText("Password")).toBeInTheDocument()

    })

    //test for  invalid input
    test('displays an error when email is invalid', () => {
        render(<Login />)
        const emailInput = screen.getByLabelText("Email")
        
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
        fireEvent.blur(emailInput)
        fireEvent.click(screen.getByText("Submit"))
        
        expect(screen.getByText("Invalid email address.")).toBeInTheDocument()
    })


    //test for short password
    test('displays an error when password is too short', () => {
        render(<Login />)
        const passwordInput = screen.getByLabelText("Password")
        
        fireEvent.change(passwordInput, { target: { value: '123' } })
        fireEvent.click(screen.getByText("Submit"))
      
        expect(screen.getByText("Password must be longer than 6 characters.")).toBeInTheDocument()
      })


   







})
