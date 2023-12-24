import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Viewresult = () => {

  const navigate = useNavigate("")
  const [data, setdata] = useState([])


  const {id} = useParams()

  const getData =async()=>{
    const data = await fetch(`/showresult/${id}`)
    const res = await data.json();
    // console.log(res)
    setdata(res.data)
  }

  useEffect(() => {
      getData() 
    
  }, [])
  
  return (
    <div className='container overflow-scroll' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}> Score</p>
    <div>
      <table className="table">
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
          {data.map((ele)=>{
            
           return <tr>
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
  </div>
  )
}

export default Viewresult