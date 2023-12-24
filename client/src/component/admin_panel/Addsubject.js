import React, { useState } from 'react'

const Addsubject = ({handleClick, setsubject, setaddclick }) => {
  const [state,setstate] = useState({
    id:"",
    subject:""
  })

  // console.log(state)

  const onchange = (e) =>{
    setstate({...state,[e.target.name]:e.target.value})
  }

const handleSubmit =async(e)=>{
  e.preventDefault();
  const {subject} = state;
  if(!subject){
    alert("Please add a Subject")
  }else{
  let response = await fetch("/addsubject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state }),
    });
    if(response.status === 200){
      setaddclick(true)
      // console.log("subject added");
      setstate({subject:"",id:""})
    }
    else{
      console.log("failed");
    }
  }
}
  return (
    <>
    <div className="container my-4 " style={{marginLeft:"19px"}}>
        <label htmlFor="id" className="form-label">Subject code</label>
        <input type="text" className="form-control" id="id" name='id' onChange={onchange} value={state.id} placeholder="enter subject id"/>
    </div>
    <div className="container my-4">
        <label htmlFor="subject" className="form-label">Subject</label>
        <input type="text" className="form-control" id="subject" name='subject' onChange={onchange} value={state.subject} placeholder="enter subject"/>
    </div>
    <button className="btn btn-success" onClick={handleSubmit}>Add</button>
    <button className="btn btn-success mx-2" onClick={handleClick=()=>{setsubject(false)}}>Cancel</button>
    </>
  )
}

export default Addsubject