import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
  
  constructor() {
      super();
      this.state = {
        emailAddress: '',
        password: '',
        errors: [],
      }
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                
                <label htmlFor="password">Password</label>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessul' ] };
          });
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    this.props.history.push('/');
  }
}

export default UserSignIn;