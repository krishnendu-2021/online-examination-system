import './App.css';
import Footer from './component/Footer';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './component/Signin';
import Adminsignin from './component/Adminsignin';
import Signup from './component/Signup';
import Admin from './component/admin_panel/Admin';
import Admhome from './component/admin_panel/Admhome';
import Admsubject from './component/admin_panel/Admsubject';
import Admexam from './component/admin_panel/Admexam';
import Admstudent from './component/admin_panel/Admstudent';
import Admquestion from './component/admin_panel/Admquestion';
import Admresults from './component/admin_panel/Admresults';
import Viewresult from './component/admin_panel/Viewresult';
import Shome from './component/student_panel/Shome';
import Student from './component/student_panel/Student';
import Exam from './component/student_panel/Exam';
import Result from './component/student_panel/Result';
import Studentdetails from './component/admin_panel/Subjectdetails'
import Addquestion from './component/admin_panel/Addquestion';

function App() {  
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/studentsignin' element={<Signin/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/adminsignin' element={<Adminsignin/>}/>
            <Route exact path='/admin' element={<Admin/>}>
              <Route path="/admin/home" element={<Admhome />}/>
              <Route path="/admin/subject" element={<Admsubject/>}/>
              <Route path="/admin/exam" element={<Admexam/>}/>
              <Route path = "/admin/exam/details/:id" element={<Studentdetails/>}/>
              <Route path = "/admin/exam/addquestion/:id" element={<Addquestion/>}/>
              <Route path = "/admin/exam/viewquestions/:id" element={<Admquestion/>}/>
              <Route path="/admin/result" element={<Admresults/>}/>
              <Route path="/admin/list" element={<Admstudent/>}/>
              <Route path='/admin/list/result/:id' element={<Viewresult/>}/>
              <Route index element={<Admhome/>}/>
            </Route>
            <Route exact path = "/student" element={<Student/>}>
              <Route path='/student/home' element={<Shome/>}/>
              {/* <Route path='/student/exam' element={<Exampage/>}/> */}
              <Route path='/student/exam/:subject/:id' element={<Exam/>}/>
              <Route path='/student/result' element={<Result/>}/>
              <Route index element={<Shome/>}/>
            </Route>
          </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
