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
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

//import context
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Give components context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);





function App() {

  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <PrivateRoute exact path="/" component={CoursesWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" conmponent={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
