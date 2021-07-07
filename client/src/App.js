import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS styles
import './reset.css';
import './global.css';

//components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';




function App() {

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={CourseDetail} />
    </Router>
    
  )

}

export default App;
