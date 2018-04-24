import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import queryString from 'query-string';
//import logo from './logo.svg';
//import './App.css';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={({location}) => {
          const {transfers, currency} = queryString.parse(location.search);
          return (
            <Fragment>
              <Sidebar selectedTransfers={(transfers || '').split(':')} currency={currency}/>
              <div className="content">
                <div>Test</div>
              </div>
            </Fragment>
          );
          }}/>
      </Router>
    );
  }
}

export default App;
