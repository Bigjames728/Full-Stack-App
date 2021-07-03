import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';


//Fetch all courses from api

function Courses() {

    const [courses, setCourses] = useState([]);
    
    
  
    useEffect(() => {
      fetch('http://localhost:5000/api/courses')
        .then(response => response.json())
        .then(responseData => {
          setCourses(responseData);
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }, [])
  
  


    return(
        <React.Fragment>
            <Header></Header>
                <div className="wrap main--grid">
                    {courses.map(course => {
                        return  <Link className="course--module course--link" to={`/courses/${course.id}`} key={`course `+ course.id}>
                                    <h2 className="course--label">Course</h2>
                                    <h3 className="course--title">{course.title}</h3>
                                </Link>
                    })}
                </div>
        </React.Fragment>
    )
}

export default Courses;
  
