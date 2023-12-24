import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import Addsubject from './Addsubject'

const Admsubject = () => {
  const navigate = useNavigate("")
 
  const [click,setclick] = useState(false)
  const [subject,setSubject] = useState(false)
  const [subdata, setsubdata] = useState([])
  const [addclick, setaddclick]=  useState(false)

  // console.log(subject)
  // console.log(addclick)

  const handleClick =()=>{
    setSubject(true);
  }

  useEffect(() => {
    if(sessionStorage.getItem(("admin"))){
   const getdata = async ()=>{
      const data = await fetch("/showsubject")
      const res = await data.json();
      setclick(false)
      setsubdata(res.subject);
      
      setaddclick(false)
   }
   getdata();
  }else navigate("/adminsignin")
  }, [addclick,click])

  // console.log(subject)
  return (
    <div className='container overflow-scroll' style={{marginLeft:"19px"}}>
      <p style={{fontSize:"21px", fontWeight:"bold"}}>Subject List</p>
      {subdata.length !==0 ?
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sl no.</th>
              <th scope="col">Subject Code</th>
              <th scope="col">Subject List</th>
              <th scope="col">option</th>
            </tr>
          </thead>
          <tbody>
            {subdata.map((ele, key)=>{
              return <tr key={key}>
              <th scope="row" >{key+1}</th>
              <th >{ele.id}</th>
              <td>{ele.subject}</td>
              <td><button className="btn btn-dark" onClick={async function(){
                 setclick(true)
                const data = await fetch(`/deletesubject/${ele.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  }})
              }}>Delete</button></td>
          </tr>
            })}
              
         </tbody>
        </table>
      </div>
      : "Please Add Subject"}
      <button className="btn btn-success mx-3" onClick={handleClick}>Add subject</button>
      {subject ? <Addsubject subject={subject} setsubject={setSubject} setaddclick={setaddclick} handleClick={handleClick}/>:""}
    </div>
  )
}

export default Admsubject