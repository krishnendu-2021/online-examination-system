import { Divider } from '@mui/material'
import React,{ useState , useEffect}  from 'react'
import {Link, useParams} from "react-router-dom"

const Exampage = () => {
  
  const [data,setData] = useState({})
  // console.log(data)

  let {id} = useParams()

  const res = async () => {
    const response = await fetch(`/showexamdetails/${id}`);
    const get = await response.json();
    setData(get.data)
    // console.log(get);
  }

  useEffect(() => {
    if(sessionStorage.getItem('user')){
      res() 
    }else{
      navigate("/studentsignin")
    }
  }, [id])
  

  return (
    <div className='container' style={{ minHeight:"84vh"}}>
        <div className='mx-2 d-flex flex-column my-5' >
        <p style={{fontSize:"21px", fontWeight:"bold", textAlign:"center"}}>{data.name} Exam</p>
        <div className='mx-2 d-flex'>
            <div className="card mx-2"  style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title text-center">{data.name}</h5>
                <Divider style={{backgroundColor: "black", width:'100%'}} className="my-2"/>
                <p>Exam Id: {data.id}</p>
                <Divider style={{backgroundColor: "black", width:'100%'}} className="my-2"/>
                <p>Pass marks: {data.passmarks}</p>
                <Divider style={{backgroundColor: "black", width:'100%'}} className="my-2"/>
                <p>Total marks: {data.totalmarks}</p>
                <Divider style={{backgroundColor: "black", width:'100%'}} className="my-2"/>
                <div className="text-center">
                    <Link to={`/student/exam/${data.id}`} className="btn btn-dark text-center">Start exam</Link>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Exampage