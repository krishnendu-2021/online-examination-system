import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./form.css"

const Signup = () => {
  const navigate = useNavigate('')
  const [credentials,setcredentials] = useState({
    fname:"",
    lname:"",
    email:"",
    password:"",
    cpassword:""
  })

  // console.log(credentials);

  const onchange =(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  
  const submitForm = async(e)=>{
    e.preventDefault();
    const {fname, lname , email, password, cpassword} = credentials;
    if(!fname || !lname || !email|| !password || !cpassword){
      alert("enter required fields")
    }else{
    let response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...credentials})
    });
    
    let result = await response.json();
    if(response.status===400){
      console.log("error")
    }else{
      alert("user saved")
      setcredentials({fname:'',lname:'',email:'',password:'',cpassword:''})
      navigate("/studentsignin")
    }
    console.log(result)
  }
  }

  return (
    <div className="container" style={{minHeight:"84vh"}}>
      
    <div className='container my-3 formContainer' style={{ border:"2px solid black",padding:"25px"}}>
      <div className="text-center" style={{fontWeight:"bold",fontSize:"20px"}}>Signup</div>
        <form className="needs-validation" style={{ margin:"auto auto"}} >
        <div className="mb-3">
    <label htmlFor="fname" className="form-label">First name</label>
    <input type="text" className="form-control" id="fname" name='fname' value={credentials.fname} onChange={onchange}  required/>
  </div>
  <div className="mb-3">
    <label htmlFor="lname" className="form-label">Last name</label>
    <input type="text" className="form-control" id="lname" name='lname' value={credentials.lname} onChange={onchange}  required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="text" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange}  required/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onchange} required/>
  </div>
  
  <div className="mb-3 text-center">
    <button className="btn btn-dark" type="submit" onClick={submitForm}>Submit form</button>
  </div>
  <Divider style={{backgroundColor: "black", width:'100%'}} className="my-2"/>

  <p>Already have an account?<Link to="/studentsignin">  signin</Link></p>
</form>

</div>
    </div>
  )
}

export default Signup