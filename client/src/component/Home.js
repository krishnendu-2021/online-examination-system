import React from 'react'
import {Link} from "react-router-dom"
import "./home.css"

const Home = () => {
  
  return (
    <>
      <div className=" my-5 homeContainer d-flex justify-content-center" >
        <div style={{border: "2px solid black" , minHeight:"75vh" , width:"80%"}}>
        <div className="d-flex justify-content-center my-4">
          <img id='cap' src="https://svgsilh.com/png-512/297099.png" style={{height:"130px"}} alt="" />
        </div>
        <div className="d-flex justify-content-around my-5 img-container">
        <div id="imgdiv"><Link to="/signup"><img id='img1' src="https://th.bing.com/th/id/OIP.1x0pTyd20xTiil5_F6JgVAHaHa?pid=ImgDet&rs=1"
          style={{height:"227px" ,border:"2px solid black",padding:"12px"}} alt=""/></Link></div>
        <div id='imgdiv'><Link to="/adminsignin"><img id='img2' src="https://th.bing.com/th/id/R.7fd1c61d05d186529c69d51672ede31d?rik=ppXnEvzWPIOztw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_458709.png&ehk=ylduuyyuNwWEpLOJZGgnx0CKLHiswE1rGtPuqSBjni4%3d&risl=&pid=ImgRaw&r=0"
            style={{height:"227px", border:"2px solid black",padding:"12px" }} alt="" /></Link></div>
        </div>
        </div>
      </div>

    </>
  )
}

export default Home