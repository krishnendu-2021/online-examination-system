import React,{useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Divider } from '@mui/material'
import {Link, useNavigate, Outlet} from 'react-router-dom'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Student = () => {
  const navigate = useNavigate("")
  const logout =()=>{
    sessionStorage.removeItem("user");
    navigate("/")
  }
 
  const show =()=>{
    
    // console.log("clicked")
    const menuList = document.querySelector(".menuList")

    menuList.classList.remove("resHide")
    menuList.classList.remove("hidemenu")
    menuList.classList.add("showMenu")
  }

  const hide =()=>{
    // console.log("clicked")
    const menuList = document.querySelector(".menuList")
    menuList.classList.remove("showMenu")
    menuList.classList.add("hidemenu")
    menuList.classList.add("resHide")
  }
  useEffect(() => {
    
    const menuList = document.querySelector(".menuList")
    menuList.classList.add("resHide")
  }, [])
    

  const mystyle={
    
    color:"#fff"
  } 
  return (
    <div className="main" style={{display:"flex"}}>
      <MenuRoundedIcon className='ham' onClick={show}/>
        <div className='d-flex flex-column text-center menuList' style={{width:"20vw", position:"relative", padding:"25px", backgroundColor:'black', color:"white"}}>
      <CloseRoundedIcon className="cross" onClick={hide}/>
        <div className='my-3 d-flex justify-content-center '>
        <Avatar className='avatar' sx={{ bgcolor: deepOrange[500] }} style={{height:"120px" , width:"100px"}} />
        </div>
        <Link to="/Student/home" style={{textDecoration:"none"}}><p style={mystyle}>Home</p></Link> 
        <Divider className='my-2' style={{backgroundColor:"grey"}}/>
        {/* <Link to="/Student/exam"><p>Exam</p></Link>
        <Divider className='my-2' style={{backgroundColor:"grey",marginLeft:"50px", width:"70%"}}/> */}
        <Link to="/Student/result" style={{textDecoration:"none"}}><p  style={mystyle}>Result</p></Link>
        <div className="text-center"><Divider className='my-2' style={{backgroundColor:"grey"}}/></div>
        <p  style={{cursor:"pointer"}} onClick={logout}>Logout</p>
      </div>
      <Outlet/>
    </div>
  )
}

export default Student