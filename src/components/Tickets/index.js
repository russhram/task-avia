import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Ticket from './Ticket';
import { parseCurrencyFromQS, parseStopsFromQS } from '../queryStringUtils';

const Tickets = ({ tickets, rates, location }) => {
  const stops = parseStopsFromQS(location.search);
  const currency = parseCurrencyFromQS(location.search);
  const filteredTickets = tickets
    .sort((a, b) => a.price > b.price)
    .filter(ticket => stops.some(i => i === ticket.stops));

  return (
    <div className="tickets">
      {filteredTickets.map(t => (
        <Ticket
          ticket={t}
          currency={currency}
          rates={rates}
          key={Object.keys(t).reduce((res, cur) => res + t[cur], '')}
        />
      ))}
    </div>
  );
};

Tickets.propTypes = {
  tickets: PropTypes.array.isRequired,
  rates: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(Tickets);
