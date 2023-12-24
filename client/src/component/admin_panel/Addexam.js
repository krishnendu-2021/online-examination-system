import React, { useState } from 'react'

  const currentdate = new Date();
  const date = currentdate.getDate() + "-" + currentdate.getMonth() + "-" + currentdate.getFullYear();

// console.log(getdate)

const Addexam = ({setToggle , toggleExam ,settoggle1}) => {
  const [value,setvalue] = useState({
    id:'',
    name:'',
    date: date,
    level:'',
    totalque:"",
    totalmarks:'',
    passmarks:""
  })
  // console.log(value)

  // console.log(value)
  const onchange =(e)=>{
    setvalue({...value, [e.target.name]:e.target.value})
  }

  const handleClick =async(e)=>{
    e.preventDefault();
    const {id,name, date ,level, totalque,totalmarks,passmarks} = value
    if(!id||!name || !level || !passmarks || !totalmarks || !totalque){
      alert("please enter required fields")
    }else{
      let response = await fetch("/addexam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...value }),
    });
    // const data = await response.json()
    if(response.status === 200){
      // console.log(data)
      settoggle1(true)
      setvalue({id:"",name:"",date:"",level:"",totalque:"",totalmarks:"",passmarks:""})
    }else {
      alert("failed")
    }
   
    }
  }

  return (
    <>
    <div className="container my-4" style={{marginLeft:"19px"}}>
        <label htmlFor="id" className="form-label">Exam id</label>
        <input type="text" className="form-control" name='id' id="id" onChange={onchange} value={value.id} placeholder="enter exam"/>
    </div>
    <div className="container my-4">
        <label htmlFor="name" className="form-label">Exam name</label>
        <input type="text" className="form-control" name='name' id="name" onChange={onchange} value={value.name} placeholder="enter subject"/>
    </div>
    <div className="container my-4">
        <label htmlFor="date" className="form-label">Date</label>
        <input type="date" className="form-control" id="date" name='date' onChange={onchange} value={value.date} placeholder="enter Date"/>
    </div>
    <div className="container my-4">
        <label htmlFor="level" className="form-label">level</label>
        <input type="text" className="form-control" id="level" name='level' onChange={onchange} value={value.level} placeholder="enter level"/>
    </div>
    <div className="container my-4">
        <label htmlFor="totalque" className="form-label">Total Question</label>
        <input type="text" className="form-control" id="totalque" name='totalque' onChange={onchange} value={value.totalque} placeholder="enter level"/>
    </div>
    <div className="container my-4">
        <label htmlFor="totalmarks" className="form-label">Total Marks</label>
        <input type="text" className="form-control" id="totalmarks" name='totalmarks' onChange={onchange} value={value.totalmarks} placeholder="enter level"/>
    </div>
    <div className="container my-4">
        <label htmlFor="passmarks" className="form-label">Passmarks</label>
        <input type="text" className="form-control" id="passmarks" name='passmarks' onChange={onchange} value={value.passmarks} placeholder="enter level"/>
    </div>
    <button className="btn btn-success" onClick={handleClick}>Add</button>
    <button className="btn btn-success mx-2" onClick={toggleExam =()=>{setToggle(false)}}>Cancel</button>
    </>
  )
}

export default Addexam