import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {

    constructor() {
        super();
        this.state = {
            course: {}
        }
    }

    // When component first mounts retrieve the individual course details
    componentDidMount() {

        const { context } = this.props;
        const id = this.props.match.params.id;

        context.data.getCourse(id)
            .then(courseData => {
                if (courseData) {
                    this.setState({ course: courseData });
                } else {
                    this.props.history.push('/notfound')
                }
            })
            .catch(err => {
                console.log('There was an error', err);
                this.props.history.push('/error');
            })
    }

    // Deletes a course (if the user owns that course)
    delete = () => {
        const { context } = this.props;

        const id = this.props.match.params.id;
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        let confirmDelete = window.confirm('This will permanently delete this course. Would you like to continue?');

        if (confirmDelete) {
            context.data.deleteCourse(id, emailAddress, password)
                .then(dataErrors => {
                    if (dataErrors.length) {
                        console.log(`${dataErrors}`);
                    } else {
                        this.props.history.push('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.props.history.push('/error')
                });
        }
    }

    render() {
        const id = this.props.match.params.id;

        const {
            User,
            title,
            description,
            materialsNeeded,
            estimatedTime,
            userId
        } = this.state.course;

        let firstName, lastName

        if (User) {
            firstName = User.firstName;
            lastName = User.lastName;
        }

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        console.log(authUser);
        
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            (() => {
                                if (authUser) {

                                    if (authUser.id === userId) {
                                        return (
                                            <React.Fragment>
                                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                                <Link className="button" to="#" onClick={this.delete}>Delete Course</Link>
                                                <Link className="button" to="/">Return to List</Link>
                                            </React.Fragment>
                                        )
                                    } else {
                                        return (
                                            <React.Fragment>
                                                <Link className="button button-secondary" to="/">Return to List</Link>
                                            </React.Fragment>
                                        )
                                    }
                                }
                            })()
                        }
                        
                    </div>
                </div>
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{title}</h4>
                                <p>By {`${firstName}`} {`${lastName}`}</p>
                                <ReactMarkdown>{description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{estimatedTime}</p>
                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default CourseDetail;