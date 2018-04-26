import React from 'react';
import { withState, lifecycle, compose } from 'recompose';
import { withRouter } from 'react-router';
import Ticket from './Ticket';
import {parseCurrencyFromQS} from "../queryStringUtils";

const callApi = async () => {
  const response = await fetch('http://localhost:3000/tickets');
  return await response.json();
};

const enhance = compose(
  withRouter,
  withState('tickets', 'setTickets', []),
  lifecycle({
    componentDidMount() {
      callApi().then(({tickets}) => {
        this.props.setTickets(tickets)
      })
    }
  })
);

const Tickets = ({tickets, location}) => {
  return (
    <div className="tickets">
      {tickets.map(t => <Ticket ticket={t}
                                currency={parseCurrencyFromQS(location.search)}
                                key={Object.values(t).join('')}/>
      )}
    </div>
  );
};

export default enhance(Tickets);
