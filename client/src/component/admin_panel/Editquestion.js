import React,{useState} from 'react'

const Editquestion = ({settoggle,toggleclick,setaddClick,questions,value,id}) => {
  

    const [change, setchange] = useState({
        que:questions.que,
        one:questions.one,
        two:questions.two,
        three:questions.three,
        four:questions.four,
        ans:questions.ans
    })

    // console.log(change)

    const onchange =(e)=>{
        setchange({...change,[e.target.name]:e.target.value})
    }

    const updateQuestion =async(e)=>{
      e.preventDefault();
      const getData = await fetch(`/updatequestion/${id}/${value}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...change })
      })
        const res = await getData.json();
        setaddClick(true)
        setchange({que:'',one:'',two:'',three:"",four:'',ans:''})
        settoggle(false)
    }

  return (
    <div className='container' style={{marginLeft:"19px"}}>
    <p style={{fontSize:"21px", fontWeight:"bold"}}>Edit Questions</p>
    <div className="container my-4">

      <label htmlFor="que" className="form-label">Question</label>
      <input type="text" className="form-control" id="que" name='que' onChange={onchange} value={change.que}  placeholder="Enter Question"/>
      <label htmlFor="one" className="form-label">option 1</label>
      <input type="text" className="form-control" id="one" name='one' onChange={onchange} value={change.one}  placeholder="enter option1"/>
      <label htmlFor="two" className="form-label">option 2</label>
      <input type="text" className="form-control" id="two" name='two' onChange={onchange} value={change.two}  placeholder="enter option2"/>
      <label htmlFor="three" className="form-label">option 3</label>
      <input type="text" className="form-control" id="three" name='three' onChange={onchange} value={change.three} placeholder="enter option3"/>
      <label htmlFor="four" className="form-label">option 4</label>
      <input type="text" className="form-control" id="four" name='four' onChange={onchange} value={change.four}  placeholder="enter option 4"/>
      <label htmlFor="ans" className="form-label">Answer</label>
      <input type="text" className="form-control" id="ans" name='ans' onChange={onchange} value={change.ans}  placeholder="enter Answer"/>
    </div>
    <button className='btn btn-success mx-2 my-2' onClick={updateQuestion}>Add</button>
    <button className='btn btn-success' onClick={toggleclick=()=>{settoggle(false)}}>Cancel</button>
    </div>
  )
}

export default Editquestion