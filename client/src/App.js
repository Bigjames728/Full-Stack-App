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
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

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
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);





function App() {

  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/" component={CoursesWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/error" component={UnhandledError} />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
