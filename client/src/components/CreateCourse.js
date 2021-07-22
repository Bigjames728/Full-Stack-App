import { Component, Fragment } from "react";
import Form from './Form';

class CreateCourse extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: null,
            errors: []
        }
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = authUser.originalPassword;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: context.authenticatedUser.authenticatedUser.id
        };

        context.data.createCourse(newCourse, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    this.setState({
                        errors
                    });
                } else {
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.log(`There has been an error: ${err}`)
                this.props.history.push('/error');
            });

    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <Form
                        errors={errors}
                        submit={this.submit}
                        cancel={this.cancel}
                        submitButtonText="Create Course"
                        elements={() => {
                            <Fragment>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="title">Course Title</label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            onChange={this.change}
                                            value={title}
                                        />

                                        <p>By Joe Smith</p>

                                        <label htmlFor="description">Course Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            onChange={this.change}
                                            value={description}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            onChange={this.change}
                                            value={estimatedTime}
                                        />

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea 
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            onChange={this.change}
                                            value={materialsNeeded}
                                        ></textarea>
                                    </div>
                                </div>
                            </Fragment>
                        }}
                    />
                </div>
            </main>
        );
    };
};

export default CreateCourse;