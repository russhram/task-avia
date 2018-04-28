import React from 'react';
import PropTypes from 'prop-types';
import { STOPS } from '../constants';
import labels from '../labels';
import TK from './../../assets/images/turkish-airlines.png';
import SU from './../../assets/images/aeroflot.png';
import S7 from './../../assets/images/S7.png';
import BA from './../../assets/images/british-airlines.png';

const convertPrice = ({ price, rates, currency }) => (price / rates.RUB) * rates[currency];
const formatPrice = ({ price, currency, rates }) => convertPrice({ price, currency, rates })
  .toLocaleString('ru', { style: 'currency', currency });
const dateToLocaleString = (date, options) => (new Date(date)).toLocaleString('ru', options);
const formatDate = date => `${dateToLocaleString(date, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})}, ${dateToLocaleString(date, { weekday: 'short' })}`;

const LOGO = { TK, SU, S7, BA };

const Ticket = ({ currency, ticket, rates }) => (
  <div className="ticket">
    <div className="ticket-action">
      <div className="ticket-airline">
        <img
          className="ticket-carrier-logo"
          src={LOGO[ticket.carrier]}
          alt={ticket.carrier}
        />
      </div>
      <div className="ticket-action-button">
        {`${labels.BUY}
        ${labels.AT} ${formatPrice({ price: ticket.price, currency, rates })}`}
      </div>
    </div>
    <div className="ticket-details">
      <div className="ticket-header">
        <div className="ticket-time">{ticket.departure_time}</div>
        <div className="ticket-stops">
          <div className="ticket-stops-label">{STOPS[ticket.stops].label}</div>
          <div className="ticket-line" />
        </div>
        <div className="ticket-time">{ticket.arrival_time}</div>
      </div>
      <div className="ticket-ways">
        {[
          [ticket.origin, ticket.origin_name, ticket.departure_date],
          [ticket.destination, ticket.destination_name, ticket.arrival_date],
        ].map(([way, wayName, date]) => (
          <div className="ticket-way" key={way}>
            <div className="ticket-way-title">{`${way}, ${wayName}`}</div>
            <div className="ticket-way-date">{formatDate(date)}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

Ticket.propTypes = {
  currency: PropTypes.string.isRequired,
  ticket: PropTypes.shape({}).isRequired,
  rates: PropTypes.shape({}).isRequired,
};

export default Ticket;
