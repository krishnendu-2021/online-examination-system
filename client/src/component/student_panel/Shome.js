import { Divider } from '@mui/material'
import React, { useState , useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Shome = () => {

  const navigate = useNavigate("")
  const [exam,setexam] = useState([])

  const getData =async()=>{
    const response = await fetch("/showexam")
    const data = await response.json();
    // console.log(data);
    setexam(data.data)
  }

  useEffect(() => {
    if(sessionStorage.getItem('user')){
      getData() 
    }else{
      navigate("/studentsignin")
    }
  }, [])
  
  return (
    <div className='container' style={{ minHeight:"84vh"}}>
        <div className='mx-2 d-flex flex-column my-5' >
        <p style={{fontSize:"21px", fontWeight:"bold", textAlign:"center"}}>Choose Subject</p>
        <div className="container">
        <div className="row">
        {exam.map((ele , i)=>{
         return (  <div className='col-md-4 my-2 ' key={i}>
            <div className="card mx-2">
            <div className="card-body">
                <h5 className="card-title text-center">{ele.name}</h5>
                <Divider style={{backgroundColor: "black"}} className="my-2"/>
                <div className="text-center">
                    <Link to={`/student/exam/${ele.name}/${ele.id}`}><button className="btn btn-dark text-center">Start exam</button></Link>
                </div>
            </div>
            </div>
        </div>
        )
        })}
        </div>
        </div>
    </div>
    </div>
  )
}

export default Shome