import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Addquestion = () => {
    const navigate = useNavigate("")
    const [state,setState] = useState({
      que:"",
      one:"",
      two:"",
      three:"",
      four:"",
      ans:""
    })
    // console.log(state)

    const onchange =(e)=>{
      setState({...state,[e.target.name]:e.target.value})
    }

    const {id} = useParams()

    const handleclick= async(e)=>{
      e.preventDefault();
      // console.log("clicked")
      const {que,one,two,three,four,ans} = state;
      if(!que || !one|| !two|| !three|| !four|| !ans){
        alert("enter required fields")
      }
      else{
        let response = await fetch(`/addquestion/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...state }),
      });
      if(response.status === 200){
        // setaddclick(true)
        // console.log("subject added");
        setState({
          que:"",
          one:"",
          two:"",
          three:"",
          four:"",
          ans:""
        })
      }
      else{
        console.log("failed");
      }
      }
    }
    
    const nav = ()=>{
      navigate(`/admin/exam/viewquestions/${id}`)
    }

  return (
    <div className='container' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Add Questions</p>
    <div className="container my-4">
      <label htmlFor="que" className="form-label">Question</label>
      <input type="text" className="form-control" id="que" name='que' onChange={onchange} value={state.que} placeholder="Enter Question"/>
      <label htmlFor="one" className="form-label">option 1</label>
      <input type="text" className="form-control" id="one" name='one' onChange={onchange} value={state.one} placeholder="enter option1"/>
      <label htmlFor="two" className="form-label">option 2</label>
      <input type="text" className="form-control" id="two" name='two' onChange={onchange} value={state.two} placeholder="enter option2"/>
      <label htmlFor="three" className="form-label">option 3</label>
      <input type="text" className="form-control" id="three" name='three' onChange={onchange} value={state.three} placeholder="enter option3"/>
      <label htmlFor="four" className="form-label">option 4</label>
      <input type="text" className="form-control" id="four" name='four' onChange={onchange} value={state.four} placeholder="enter option 4"/>
      <label htmlFor="ans" className="form-label">Answer</label>
      <input type="text" className="form-control" id="ans" name='ans' onChange={onchange} value={state.ans} placeholder="enter Answer"/>
    </div>
    <button className='btn btn-success mx-2' onClick={handleclick}>Add</button>
    <button className='btn btn-success' onClick={nav}>Go back</button>
  </div>
  )
}

export default Addquestion