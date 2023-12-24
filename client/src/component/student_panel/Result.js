import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Result = () => {

  const navigate = useNavigate("")
  const [data, setdata] = useState([])
  const user = sessionStorage.getItem("user")
  // console.log(user)

  const getData =async()=>{
    const data = await fetch(`/showresult/${user}`)
    const res = await data.json();
    // console.log(res)
    setdata(res.data)
  }

  useEffect(() => {
    if(sessionStorage.getItem('user')){
      getData() 
    }else{
      navigate("/studentsignin")
    }
  }, [])
  
  return (
    
    <div className='container overflow-scroll' style={{marginLeft:"19px", minHeight:"84vh"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Your Score</p>
    {data.length !== 0 ? 
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Exam</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col"> Score</th>
            <th scope="col">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele,i)=>{
            
           return <tr key={i}>
            <th scope="row">{ele.exam_name}</th>
            <td>{ele.exam_date}</td>
            <td>{ele.result_status}</td>
            <td>{ele.result_score}</td>
            <td>{ele.total_marks}</td>
          </tr>
          })}
        </tbody>
      </table>
    </div>
   : "Give exams inorder to view result" }
  </div>
  )
}

export default Result