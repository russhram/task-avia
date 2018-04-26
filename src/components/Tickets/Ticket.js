import React from 'react';
import {STOPS} from "../constants";

const labels = {
  BUY: 'Купить',
  AT: 'за',
};

const formatPrice = (price, currency) => price.toLocaleString('ru', {style: 'currency', currency});
const dateToLocaleString = (date, options) => (new Date(date)).toLocaleString('ru', options);
const formatDate = date => `${dateToLocaleString(date, {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})}, ${dateToLocaleString(date, {weekday: 'short'})}`;

const Ticket = ({currency, ticket}) => (
  <div className="ticket">
    <div className="ticket-action">
      <div className="ticket-airline">
        {ticket.carrier}
      </div>
      <div className="ticket-action-button">
        {`${labels.BUY}
        ${labels.AT} ${formatPrice(ticket.price, currency)}`}
      </div>
    </div>
    <div className="ticket-details">
      <div className="ticket-header">
        <div className="ticket-time">{ticket.departure_time}</div>
        <div className="ticket-stops">
          <div className="ticket-stops-label">{STOPS[ticket.stops].label}</div>
          <div className="ticket-line"/>
        </div>
        <div className="ticket-time">{ticket.arrival_time}</div>
      </div>
      <div className="ticket-ways">
          {[
            [ticket.origin, ticket.origin_name, ticket.departure_date],
            [ticket.destination, ticket.destination_name, ticket.arrival_date]
          ].map(([way, way_name, date]) => (
            <div className="ticket-way" key={way}>
              <div className="ticket-way-title">{`${way}, ${way_name}`}</div>
              <div className="ticket-way-date">{formatDate(date)}</div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default Ticket;