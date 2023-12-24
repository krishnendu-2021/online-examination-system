import React, { useState , useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Admstudent = () => {

  const [data,setData] = useState([])
  // console.log(data)
  const navigate = useNavigate("")
  
  useEffect(() => {
    if(sessionStorage.getItem(("admin"))){
      const getData = async()=>{
        const data = await fetch("/getusers");
        const res = await data.json()
        setData(res.data)
      }
      getData();
    }
    else navigate("/adminsignin")
  }, [])
  
  

  return (
   
       <div className='container overflow-scroll' style={{marginLeft:"19px"}}>
      <p style={{fontSize:"21px", fontWeight:"bold"}}>Subject List</p>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">User Email</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element,i)=>{
               return <tr key={i}>
                <th scope="row">{element.fname} {element.lname}</th>
                <td>{element.email}</td>
                <td><Link to={`/admin/list/result/${element.email}`}><button className="btn btn-dark">View Result</button> </Link></td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admstudent