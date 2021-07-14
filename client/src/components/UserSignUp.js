import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            errors: [],
        };
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text"
                                    value={firstName} 
                                    onChange={this.change} 
                                    placeholder="First Name" 
                                />
                                <label htmlFor="lastName"> Last Name</label>
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text"
                                    value={lastName} 
                                    onChange={this.change} 
                                    placeholder="Last Name" 
                                />
                                <label htmlFor="emailAddress">Email Address</label>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress"
                                    type="email"
                                    value={emailAddress} 
                                    onChange={this.change} 
                                    placeholder="Email Address"
                                />
                                <label htmlFor="password">Password</label>
                                <input 
                                    id="password" 
                                    name="password"
                                    type="password"
                                    value={password} 
                                    onChange={this.change} 
                                    placeholder="Password" 
                                />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword} 
                                    onChange={this.change} 
                                    placeholder="Confirm Password" 
                                />
                            </React.Fragment>
                        )} 
                    />
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>
                </div>
            </main>
            
        );
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

        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

        // New user payload
        const user = {
        firstName,
        lastName,
        emailAddress,
        password
        };

        if (password === confirmPassword) { // Check to see if password and confirmPassword match

            // If they do match, create user
            context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                this.setState({ errors });
                } else {
                context.actions.signIn(emailAddress, password)
                    this.props.history.push('/');
                }
            })
            .catch( err => { // handle rejected promises (for instance if the API is down or connectivity issues)
                console.log(err);
                this.props.history.push('/error'); // push to history stack
            });
        } else {
            this.setState({
                errors: ['"Password" and "Confirm Password" must match.']
            });
        }
  
    }

    cancel = () => {
    this.props.history.push('/')

    }
}