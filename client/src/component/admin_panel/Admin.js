import React,{useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Divider } from '@mui/material'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Admin = () => {
  const navigate = useNavigate("")
  const logout=()=>{
    sessionStorage.removeItem("admin");
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
  return (
    <div className="main" style={{display:"flex", minHeight:"84vh"}}>
            <MenuRoundedIcon className='ham' onClick={show}/>
         <div className='d-flex flex-column text-center menuList' style={{width:"20vw",position:"relative", padding:"25px", backgroundColor:'black', color:"white"}}>
         <CloseRoundedIcon className="cross" onClick={hide}/>
        <div className='my-3 d-flex justify-content-center '>
        <Avatar className='avatar' sx={{ bgcolor: deepOrange[500] }} style={{height:"120px" , width:"100px"}}/>
        </div>
        <Link to="/admin/home" style={{textDecoration:"none"}}><p style={{color:"#fff"}}>Home</p></Link> 
        <Divider className='my-2' style={{backgroundColor:"#fff"}}/>
        <Link to="/admin/subject" style={{textDecoration:"none"}}><p style={{color:"#fff"}}>Subject</p></Link>
        <Divider className='my-2' style={{backgroundColor:"#fff"}}/>
        <Link to="/admin/exam" style={{textDecoration:"none"}}><p style={{color:"#fff"}}>Exam</p></Link>
        <Divider className='my-2' style={{backgroundColor:"#fff"}}/>
        <Link to="/admin/result" style={{textDecoration:"none"}}><p style={{color:"#fff"}}>Result</p></Link>
        <Divider className='my-2' style={{backgroundColor:"#fff"}}/>
        <Link to="/admin/list" style={{textDecoration:"none"}}><p style={{color:"#fff"}}>Student List</p> </Link>
        <Divider className='my-2' style={{backgroundColor:"#fff"}}/>
        <p onClick={logout} style={{color:"#fff",cursor:"pointer"}}>Logout</p>
      </div>
      <Outlet/>
    </div>
  )
}

export default Admin