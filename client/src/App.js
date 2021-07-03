import React, { Component } from 'react';
import axios from 'axios';


import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(responseData => {
        this.setState({ courses: responseData.data }); // with axios, the json data is accessed with .data 
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    console.log(this.state.courses)
    const { courses } = this.state;
    return(
      <div>
        {courses.map((course) => {
          return <div><ul>{course.title} - {course.description}</ul></div>;
        })}
      </div>
    )
  }

}

