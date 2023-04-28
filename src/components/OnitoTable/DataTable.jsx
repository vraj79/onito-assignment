import axios from 'axios'
import React, { useEffect } from 'react'

const getFormData=async()=>{
    let res=await axios.get("https://mocknine.onrender.com/users");
    console.log(res.data)
}
const DataTable = () => {
    useEffect(()=>{
        getFormData();
    },[])
  return (
    <div>DataTable</div>
  )
}

export default DataTable