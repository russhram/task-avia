import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';

import Sidebar from './components/Sidebar';
import Tickets from './components/Tickets';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Sidebar/>
          <Tickets/>
        </Fragment>
      </Router>
    );
  }
}

export default App;
