import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Instructorcoursegrade.css';
import InstructorCourseNavbar from "../Component/InstructorCourseNavbar";
import InstGrade from "../Component/InstGrade"


function InstructorCourseGrade(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetchCourseDetails(_id);
    }, [_id]);

    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:3001/courses/addcourses/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch course details');
            }
            const data = await response.json();
            setCourse(data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    return (
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className="instgradedashall">
            {course && (
                <div className="instgradedashinfo">
                    <div className="instgradetitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="instgradecode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="instgradeduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="instgradedashcontent">
                <div className="instgradenav">
                    <InstructorCourseNavbar/>
                </div>
                <div className="instgradecontents">
                    <div className="leftgradelist">
                        <InstGrade/>
                    </div>                    
                </div>

            </div>
        </div>
        </>
    );
}

export default InstructorCourseGrade;