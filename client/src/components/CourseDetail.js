import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Header from './Header';


function CourseDetails() {

    const [course, setCourse] = useState([]);
    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:5000/api/courses/${id}`)
        .then(response => response.json())
        .then(responseData => {
          setCourse(responseData);
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

export default CourseDetails;