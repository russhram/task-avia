import React from 'react';
import { withState, lifecycle, compose } from 'recompose';
import { withRouter } from 'react-router';
import Ticket from './Ticket';
import {parseCurrencyFromQS, parseStopsFromQS} from "../queryStringUtils";

const callApi = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const enhance = compose(
  withRouter,
  withState('tickets', 'setTickets', []),
  withState('rates', 'setRates', {}),
  lifecycle({
    componentDidMount() {
      callApi('http://localhost:3000/tickets').then(({tickets}) => {
        this.props.setTickets(tickets)
      });
      callApi('http://data.fixer.io/api/latest?access_key=80db75b40686aafe8ba34708ac6f45ba').then(({rates}) => {
        this.props.setRates(rates);
      })
    }
  })
);

const Tickets = ({tickets, rates, location}) => {
  const stops = parseStopsFromQS(location.search);
  const currency = parseCurrencyFromQS(location.search);
  const filteredTickets = tickets
    .sort((a, b) => a.price > b.price)
    .filter(ticket => stops.some(i => i === ticket.stops));

  return (
    <div className="tickets">
      {filteredTickets.map(t => <Ticket ticket={t}
                                currency={currency}
                                rates={rates}
                                key={Object.values(t).join('')}/>
      )}
    </div>
  );
};

export default enhance(Tickets);
