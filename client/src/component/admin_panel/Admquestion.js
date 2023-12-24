import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editquestion from './Editquestion'

const Admquestion = () => {
  const navigate = useNavigate("")
  const [value,setvalue] = useState(0)
  const [addClick, setaddClick] = useState(false)
  const [toggle,settoggle] = useState(false)
  const [questions, setquestions] = useState([])
  const [click, setclick] = useState(false)
  // console.log(questions[value])
  const {id} = useParams()
  
  useEffect(() => {
    if(sessionStorage.getItem("admin")){

      const getData= async()=>{
        const data = await fetch(`/showquestion/${id}`)
        const res = await data.json();
         // console.log(res);
         setclick(false)
        setquestions(res.data)
        setaddClick(false)
      }
      getData();
    }else navigate("/adminsignin")
  }, [id,addClick,click])

  const toggleclick = value => event => {
    // console.log(value)
    setvalue(value)
    settoggle(true)
  }

  const nav =()=>{
    navigate(`/admin/exam`);
  }
  
  return (
    <div className='container overflow-scroll' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Question List</p>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">option 1</th>
            <th scope="col">option 2</th>
             <th scope="col">option 3</th>
            <th scope="col">option 4</th>
            <th scope="col">Answer</th>
            <th scope="col">option</th>

          </tr>
        </thead>
        <tbody>
          {questions.map((ele,i)=>{
            return <tr key={i}>
              <th scope="row">{ele.que}</th>
              <td>{ele.one}</td>
              <td>{ele.two}</td>
              <td>{ele.three}</td>
              <td>{ele.four}</td>
              <td>{ele.ans}</td>
              <td><button className='btn btn-dark mx-2 my-1' onClick={toggleclick(i)} > Edit</button>
              <button className='btn btn-dark' onClick={async function(){
                console.log(ele.i)
                setclick(true);
                const data = await fetch(`/deletequestion/${id}/${i}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    }
                  })
              }}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    <button className='btn btn-success my-3' onClick={nav}>Go back</button>
    {toggle && <Editquestion settoggle={settoggle} value={value} setaddClick={setaddClick} id={id} questions={questions[value]} toggleclick={toggleclick}/> }

  </div>
  )
}

export default Admquestion