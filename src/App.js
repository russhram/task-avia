import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withState, lifecycle, compose, withHandlers } from 'recompose';
import classNames from 'classnames';

import Sidebar from './components/Sidebar';
import Tickets from './components/Tickets';

const enhance = compose(
  withState('tickets', 'setTickets', []),
  withState('rates', 'setRates', {}),
  withState('isLoading', 'setLoading', true),
  withHandlers({
    callApi: props => async (url) => { // eslint-disable-line consistent-return
      try {
        props.setLoading(true);
        const response = await fetch(url); // eslint-disable-line no-undef
        const result = await response.json();
        return result;
      } finally {
        props.setLoading(false);
      }
    },
  }),
  withHandlers({
    requestData: props => () => {
      props.callApi('/tickets').then(({ tickets }) => {
        props.setTickets(tickets);
      });
      props.callApi('http://data.fixer.io/api/latest?access_key=80db75b40686aafe8ba34708ac6f45ba').then(({ rates }) => {
        props.setRates(rates);
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.requestData(this.props);
    },
  }),
);

const App = enhance(({ tickets, rates, isLoading, requestData, ...props }) => (
  <Router>
    <Fragment>
      <div
        className={classNames('logo', { logo_spin: isLoading })}
        onClick={() => requestData(props)}
      />
      <div className="content">
        <Sidebar />
        <Tickets tickets={tickets} rates={rates} />
      </div>
    </Fragment>
  </Router>
));

export default App;
