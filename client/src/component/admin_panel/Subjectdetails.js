import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Subjectdetails = () => {

  const navigate = useNavigate("")

  const [data,setData] = useState({})


  let {id} = useParams()
  useEffect(() => {
    const res = async () => {
      const response = await fetch(`/showexamdetails/${id}`);
      const get = await response.json();
      setData(get.data)
   
    }
    res();
  }, [id])

  const handleclick = ()=>{
    navigate("/admin/exam")
  }
  
  return (
    <div className='container overflow-scroll' style={{marginLeft:"19px", minHeight:"84vh"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Exam Details</p>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Exam Name</th>
            <th scope="col">Exam Creation Date</th>
            <th scope="col">Exam Total Marks</th>
            <th scope="col">Exam Total Question</th>
            <th scope="col">Exam PassMarks</th>
            <th scope="col">Exam Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{data.name}</th>
            <td>{data.date}</td>
            <td>{data.totalmarks}</td>
            <td>{data.totalque}</td>
            <td>{data.passmarks}</td>
            <td>{data.level}</td>
          </tr>
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={handleclick}>Go Back</button>
    </div>
  </div>
  )
}

export default Subjectdetails