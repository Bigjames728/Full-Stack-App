import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Header from './Header';


function CourseDetail() {

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
            <main>
              <div className="actions--bar">
                <div className="wrap">
                  <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                  <Link className="button" to={`/`} onClick={handleDelete}>Delete Course</Link>
                  <Link className="button" to="/">Return to List</Link>
                </div>
              </div>
            </main>
        </React.Fragment>
    )
}

export default CourseDetail;