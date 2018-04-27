import React from 'react';
import { withRouter } from 'react-router';
import Ticket from './Ticket';
import {parseCurrencyFromQS, parseStopsFromQS} from "../queryStringUtils";

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

export default withRouter(Tickets);
