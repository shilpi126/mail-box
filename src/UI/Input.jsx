import React from 'react'

export const Input = (props) => {
  return (
        <input
        id={props.id}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        className={props.className}
        
        />
    
  )
}



export const Label = (props) => {
    return (
      
        <label className={props.className} htmlFor={props.htmlFor}>{props.label}</label>
         
      
    )
  }
  
