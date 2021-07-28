import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      originalPassword: null
    }
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      courses: this.courses,
      actions: { // Add the 'actions' property and object to the Provider's value prop to store any event handlers or actions you want to perform on data that's passed down through context.
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password, userId) => {
    this.setState({
      originalPassword: password
    });

    const user = await this.data.getUser(emailAddress, password, userId);

    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      // Set cookie in memory for 1 day
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({
      authenticatedUser: null
    });
      
    // Remove cookie after user signs out
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}