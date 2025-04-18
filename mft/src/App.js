import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Home from './Routes/Home';
import AboutUs from './Routes/AboutUs';
import Contactus from './Routes/Contactus';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Studentdash from './Routes/Studentdash';
import Studentcourse from './Routes/Studentcourse';
import Studentlibrary from './Routes/Studentlibrary';
import Studentmessage from './Routes/Studentmessage';
import Studentcalendar from './Routes/Studentcalendar';
import Studentevent from './Routes/Studentevent';
import Admindash from './Routes/Admindash';
import Admincourse from './Routes/AdminCourse';
import AdminCalendar from './Routes/AdminCalendar';
import AdminEvent from './Routes/AdminEvent';
import AdminInstructor from './Routes/AdminInstructor';
import AdminStudent from './Routes/AdminStudents';
import Instructordash from './Routes/Instructordash';
import Instructorcourse from './Routes/InstructorCourse';
import InstructorLibrary from './Routes/InstructorLibrary';
import InstructorMessage from './Routes/InstructorMessage';
import InstructorCalendar from './Routes/InstructorCalendar';
import InstructorEvent from './Routes/InstructorEvent';
import InstructorCoursedash from './Routes/InstructorCoursedash';
import InstructorCourseAssignment from './Routes/InstructorCourseassignment';
import InstructorCourseGrade from './Routes/InstructorCourseGrade';
import StudentCoursedash from './Routes/StudentCoursedash';
import StudentCourseAssignment from './Routes/StudentCourseassignment';
import StudentCourseGrade from './Routes/StudentCourseGrade';
import InstructorCourseStudents from './Routes/InstructorCourseStudent';
import InstructorCourseNotifications from './Routes/InstructorCourseNotifications';
import StudentCourseNotifications from './Routes/StudentCourseNotifications';

const App=()=>{
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path="/studentdash" element={<Studentdash/>}/>
        <Route path='/studentcourse' element={<Studentcourse/>}/>
        <Route path='/studentlibrary' element={<Studentlibrary/>}/>
        <Route path='/studentmessage' element={<Studentmessage/>}/>
        <Route path='/studentcalendar' element={<Studentcalendar/>}/>
        <Route path='/studentevent' element={<Studentevent/>}/>
        <Route path="/admindash" element={<Admindash/>}/>
        <Route path="/admincourse" element={<Admincourse/>}/>
        <Route path="/admincalendar" element={<AdminCalendar/>}/>
        <Route path='/adminevent' element={<AdminEvent/>}/>
        <Route path='/admininstructor' element={<AdminInstructor/>}/>
        <Route path='/adminstudent' element={<AdminStudent/>}/>
        <Route path="/instructordash" element={<Instructordash/>}/>
        <Route path="/instructorcourse" element={<Instructorcourse/>}/>
        <Route path="/instructorlibrary" element={<InstructorLibrary/>}/>
        <Route path="/instructormessage" element={<InstructorMessage/>}/>
        <Route path="/instructorcalendar" element={<InstructorCalendar/>}/>
        <Route path="/instructorevent" element={<InstructorEvent/>}/>
        <Route path="/instructorcoursedash/:_id/contents" element={<InstructorCoursedash/>}/>
        <Route path="/instructorcoursedash/:_id/assignments" element={<InstructorCourseAssignment/>}/>
        <Route path="/instructorcoursedash/:_id/grades" element={<InstructorCourseGrade/>}/>
        <Route path="/instructorcoursedash/:_id/students" element={<InstructorCourseStudents/>}/>
        <Route path="/instructorcoursedash/:_id/notifications" element={<InstructorCourseNotifications/>}/>
        <Route path="/studentcoursedash/:_id/contents" element={<StudentCoursedash/>}/>
        <Route path="/studentcoursedash/:_id/assignments" element={<StudentCourseAssignment/>}/>
        <Route path="/studentcoursedash/:_id/grades" element={<StudentCourseGrade/>}/>
        <Route path="/studentcoursedash/:_id/notifications" element={<StudentCourseNotifications/>}/>
      </Routes>
    </div>
  );
}
export default App;
