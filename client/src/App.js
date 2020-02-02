import React from 'react';

import Routes from './components/Routes';
import {BrowserRouter as Router,Route} from 'react-router-dom';





function App() {
  return (
    <Router>
    <div className="App">
      <Routes />
    </div>
    </Router>
  
   );
}

export default App;
