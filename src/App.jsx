import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Home            from './components/Home/Home';

class App extends Component {
    render() {
        return (
            <Router>
        	<div>
				<Route exact path='/'          component={Home} />
      
			</div>
      </Router>
    );
  }
} 
export default App;
