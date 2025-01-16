import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useFetch = (url,user) => {
    const [data, setData] = useState(null);

    useEffect(()=>{
        const getMail = async() => {
            try{
              const response = await axios.get(`${url}/${user}.json`)
              const res = await response;
              console.log(res.data)
              setData(res.data)
            
            }catch(err){
              console.log(err.message)
            }
          }
         
          getMail();
        
    },[url, user])

  return (
    data
  )
}

export default useFetch