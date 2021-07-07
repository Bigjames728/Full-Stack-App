import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
    
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        const { data } = this.props.context;

        data.getCourses()
            .then(courseData => {
                this.setState({ courses: courseData });
            })
            .catch(err => {
                console.log('There was an error', err);
                this.props.history.push('/error');
            })
    }

    render() {
        
        const { courses } = this.state;
        console.log(courses);
        return (
            <main>
                <div className="wrap main--grid">
                    {courses.map(course => {
                        return <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id.toString()}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    })}
                </div>
            </main>
        )
    }

}

export default Courses;
