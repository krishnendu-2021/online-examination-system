import React,{useState,useEffect} from 'react'
import { Divider } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Exam = () => {
  const navigate = useNavigate()

  const [questions, setquestions] = useState([])
  const {id} = useParams()
  const {subject} = useParams()

  const getData= async()=>{
    const data = await fetch(`/showquestion/${id}`)
    const res = await data.json();
    setquestions(res.data)
  }

  useEffect(() => {
    if(sessionStorage.getItem('user')){
      getData() 
    }else{
      navigate("/studentsignin")
    }
  }, [id])

  

  
  const [answer , setAnswer] = useState({
    answer1:"",
    answer2:"",
    answer3:"",
    answer4:"",
    answer5:"",
  });

  const onRadioButtonChange = (e) =>{
  setAnswer({
        ...answer, 
        [e.target.name] : e.target.value
})};
  
let count = 0;
console.log(answer)

let  correctAnswer  = [] ;
const submit =async(e)=>{
  e.preventDefault();
  for(let i=0; i<questions.length ; i++){
    correctAnswer.push(questions[i].ans)
  }

  let score = 0;
  let status = "";
  
  if(correctAnswer[0] === answer.answer1) score++;
  if(correctAnswer[1] === answer.answer2) score++;
  if(correctAnswer[2] === answer.answer3) score++;
  if(correctAnswer[3] === answer.answer4) score++;
  if(correctAnswer[4] === answer.answer5) score++;

  if(score>=3) status = "pass"
  else status = "fail"

  var date = new Date();
        var d =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
        var t =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;
   
       let data={
         "result_status": status,
         "result_score": score,
         "user_email":sessionStorage.getItem("user"),
         "exam_date": d+" "+t,
         "exam_name": subject,
         "total_marks": "5",
         "exam_id": id,
         "total_Question": "5"
       };
  
       let response = await fetch("/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
    });

    navigate("/student/result")
}



  return (
    <div className='d-flex flex-column ' style={{width:"100vw"}}>
    <div className='container mx-2 ' style={{minHeight:"79vh"}}>
    <p className='my-3' style={{fontSize:"21px", fontWeight:"bold"}}>Question List</p>
    <Divider className='my-2' style={{width:"100%", backgroundColor:"black"}}/>
    {questions.map((ele,i)=>{
      count++;
      return ( <div className="container" key={i}>
            <p>{ele.que}</p> 
            <input type="radio" onChange={onRadioButtonChange} id={ele.one} name={"answer"+count} value={ele.one} className='mx-2 my-1'/>
            <label for="option1">{ele.one}</label><br/>
            <input type="radio" onChange={onRadioButtonChange} id={ele.two} name={"answer"+count} value={ele.two} className='mx-2 my-1'/>
            <label for="option2">{ele.two}</label><br/>
            <input type="radio" onChange={onRadioButtonChange} id={ele.three} name={"answer"+count} value={ele.three} className='mx-2 my-1'/>
            <label for="option3">{ele.three}</label><br/>
            <input type="radio" onChange={onRadioButtonChange} id={ele.four} name={"answer"+count} value={ele.four} className='mx-2 my-1'/>
            <label for="option4">{ele.four}</label>
           <Divider className='my-2' style={{width:"100%", backgroundColor:"black"}}/>
      </div>
      )
    })}
    
    </div>
    <div>
       <Link to="/student/result"><button className='btn btn-success mx-2' onClick={submit}>Submit</button></Link>
    </div>
    </div>
  )
}

export default Exam