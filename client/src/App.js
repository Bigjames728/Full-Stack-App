import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CSS styles
import './reset.css';
import './global.css';

//components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import NotFound from './components/NotFound';

//import context
import withContext from './Context';

// Give components context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);





function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
