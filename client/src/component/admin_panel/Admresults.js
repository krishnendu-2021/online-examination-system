import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Admresults = () => {
  const navigate = useNavigate("")
  const [data,setData] = useState([])
  // console.log(data)

  useEffect(() => {
    if(sessionStorage.getItem("admin")){
      const getData = async ()=>{
        const data = await fetch('/showresult')
        const res = await data.json();
        setData(res.data)
      }
      getData();
    }else navigate("/adminsignin")
  }, [])
  

  return (
    <div className='container overflow-scroll' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Result List</p>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User Mail</th>
            <th scope="col">Subject</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Score</th>
            <th scope="col">Total Marks</th>
            <th scope="col">Total Questions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele,i)=>{

          return <tr key={i}>
            <th scope="row">{ele.user_email}</th>
            <td>{ele.exam_name}</td>
            <td>{ele.exam_date}</td>
            <td>{ele.result_status}</td>
            <td>{ele.result_score}</td>
            <td>{ele.total_marks}</td>
            <td>{ele.total_Question}</td>
          </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Admresults