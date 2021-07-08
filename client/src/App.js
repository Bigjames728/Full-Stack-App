import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS styles
import './reset.css';
import './global.css';

//components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';

//import context
import withContext from './Context';

// Give components context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);





function App() {

  return (
    <Router>
      <Header />
      <Route exact path="/" component={CoursesWithContext} />
      <Route exact path="/courses/:id" component={CourseDetailWithContext} />
    </Router>
  )
}

export default App;
