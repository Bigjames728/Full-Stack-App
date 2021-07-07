import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS styles
import './reset.css';
import './global.css';

//components
import Courses from './components/Courses';

//import context
import withContext from './Context';

// Give components context
const CoursesWithContext = withContext(Courses);





function App() {

  return (
    <Router>
      
      <Route exact path="/" component={CoursesWithContext} />
    </Router>
    
  )

}

export default App;
