import React from 'react'
import { Input, Label } from '../UI/Input'

const Header = () => {
return (
    <div className='flex p-4 bg-slate-800'>
        <h1 className='text-red-500 mr-24'>Inbox</h1>
        <div>
            <Label 
            lebel="Search"
            htmlFor="search"
            />

            <Input
            type="search"
            id="search"
            placeholder="Search..."
            
            />
        </div>
    </div>
    )
}

export default Header