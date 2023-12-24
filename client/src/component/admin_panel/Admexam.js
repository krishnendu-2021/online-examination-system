import React, { useEffect, useState } from 'react'
import Addexam from './Addexam'
import {Link , Outlet, useNavigate} from "react-router-dom"

const Admexam = () => {

  const navigate = useNavigate("")
  const [toggle, setToggle] = useState(false)
  const [exam, setexam] = useState([])
  const [toggle1, settoggle1] = useState(false)
  const [click,setclick] = useState(false)

  const toggleExam =()=>{
    setToggle(true)
  }

  
  
useEffect(() => {
  if(sessionStorage.getItem("admin")){

    const getData = async()=>{
      const res = await fetch(`/showexam`)
      const data = await res.json();
      // console.log(data)
      setclick(false)
      setexam(data.data)
      settoggle1(false)
    } 
    getData()
  }else navigate("/adminsignin")
}, [toggle1,click])

  return (
    <div className='container overflow-scroll' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Exam List</p>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">sl no</th>
            <th scope="col">Exam name</th>
            <th scope="col">Date</th>
            <th scope="col">level</th>
            <th scope="col">options</th>
          </tr>
        </thead>
        <tbody>
          {exam.map((ele, val)=>{
            return <tr key={val}>
            <th scope="row">{val+1}</th>
            <td>{ele.name}</td>
            <td>{ele.date}</td>
            <td>{ele.level}</td>
            <td> 
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Select
            </button>
            <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
            <li> <Link to={`/admin/exam/details/${ele.id} `}><button className="btn btn-dark " >Details</button></Link></li>
             <li> <Link to= {`/admin/exam/viewquestions/${ele.id}`}><button className="btn btn-dark my-1">View Questions</button></Link></li>
             <li> <Link to={`/admin/exam/addquestion/${ele.id}`}><button className="btn btn-dark ">Add Questions</button></Link></li>
             <li> <button className="btn btn-dark my-1" 
                onClick={async function(){
                  // console.log(ele.id)
                  setclick(true);
                  const data = await fetch(`/deletexam/${ele.id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      }
                    })
                  
                  const del = await fetch(`/deletequeofsub/${ele.id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      }
                    })
                }}>Delete</button></li>
                </ul>
                </div>
            </td>
          </tr>
          })}
          
        </tbody>
      </table>
          <Outlet/>
    </div>
    <button className="btn btn-success" onClick={toggleExam}>Add Exam</button>
    {toggle ? <Addexam toggleExam={toggleExam} setToggle={setToggle} settoggle1={settoggle1}/>:""}
  </div>
  )
}

export default Admexam