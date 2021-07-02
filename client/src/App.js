import React, { Component } from 'react';

import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ courses: responseData.data });
      })
  }


  render() {
    return(
      <div></div>
    )
  }

}

