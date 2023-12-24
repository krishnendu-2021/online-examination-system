import { Divider } from '@mui/material'
import React, { useState,useEffect } from 'react'
import {Link ,Outlet, useNavigate} from "react-router-dom"


const Admhome = () => {
  const navigate = useNavigate("")

  const [exam, setexam] = useState(0)
  const [user, setuser] = useState(0)

  const getExam = async ()=>{
    const exam = await fetch("/showexam");
    const res = await exam.json();
    setexam(res.data.length)
  }
  
  const getusers= async ()=>{
    const users = await fetch("/getusers");
    const res = await users.json();
    setuser(res.data.length)
  }

  useEffect(() => {
    if(sessionStorage.getItem("admin")){
      getExam();
      getusers();
    }
    else navigate("/adminsignin")
  }, [])
  

  return (
    <>
    
    <div className='mx-2 d-flex flex-column my-5' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold", textAlign:"center"}}>Dashboard</p>
    <div className='mx-2 d-flex adminHome'>
        <div className="card mx-2 my-1" >
        <div className="card-body">
            <h5 className="card-title">Number of exams - {exam}</h5>
            <Divider style={{backgroundColor: "black"}} className="my-2"/>
            <Link to="/admin/exam" className="btn btn-dark">View Exams</Link>
        </div>
        </div>
       
        <div className="card mx-2 my-1" >
        <div className="card-body">
            <h5 className="card-title ">Number of users - {user}</h5>
            <Divider style={{backgroundColor: "black"}} className="my-2"/>
            <Link to="/admin/list" className="btn btn-dark">View users</Link>
        </div>
        </div>       
    </div>
    <Outlet/>
    </div>
    </>
  )
}

export default Admhome