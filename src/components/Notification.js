import React from 'react'

const Notification = (props) => {
  

  return (
   <React.Fragment>
   
         
        <div className={`flex justify-between text-white w-screen h-10 px-8 pt-2
            ${
                props.status === "pending" ? "bg-orange-500" :
                props.status === "success" ? "bg-green-500" :
                props.status === "error" ? "bg-red-500" : ""
        } ` }>
            <p>{props.title}</p>
            <p>{props.message}. . .</p>
        </div>
    
   </React.Fragment>
  )
}

export default Notification