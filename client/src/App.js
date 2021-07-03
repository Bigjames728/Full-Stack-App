import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS styles
import './reset.css';
import './global.css';

//components
import Courses from './components/Courses';




function App() {

  return (
    <Router>
      <Route exact path="/" component={Courses} />
    </Router>
    
  )

}

export default App;
