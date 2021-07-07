import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Data from '../Data';
import ReactMarkdown from 'react-markdown';





function CourseDetail() {

  const data = new Data();

  const [course, setCourse] = useState("");
  const [user, setUser] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const { id } = useParams();

  const history = useHistory();

  //Delete a course
  const handleDelete = async(e) => {
    await data.deleteCourse(`/courses/${id}`)
      .then(async (response) => {
        if (response === null) {
          history.push('/')
        } else {
          throw new Error()
        }
      })
      .catch (error => {
        console.log(error);
        history.push('/error');
      })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if (response.status === 404) {
          return history.push("/notfound")
        } else if (response.status === 500) {
          throw new Error()
        } else {
          return response.json()
        }
      })
      .then(responseData => {
        if(responseData) {
          setCourse(responseData);
          if (responseData.description) {
            setCourseDescription(responseData.description);
          }
          if (responseData.materialsNeeded) {
            setMaterialsNeeded(responseData.materialsNeeded);
          }
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        history.push('/error');
      });
  }, [id, history])

  return(
    <React.Fragment>
        <main>
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
              <Link className="button" to={`/`} onClick={handleDelete}>Delete Course</Link>
              <Link className="button" to="/">Return to List</Link>
            </div>
          </div>
          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>by </p>
                  <p>{courseDescription}</p>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>
                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--details--list">
                    <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </main>
    </React.Fragment>
  )
}

export default CourseDetail;