import React from 'react';
import { withRouter } from 'react-router'
import queryString from 'query-string';
import {updateStopQuery, addQueryParams, isStopActive} from './../queryStringUtils';

import { Link, NavLink } from "react-router-dom";
import StopRow from './StopRow';

import './sidebar.css';
import './../currency.css';
import './../stop.css';

const labels = {
  ALL: 'Все',
  WITHOUT: 'Без пересадок',
  ONE: '1 пересадка',
  TWO: '2 пересадки',
  THREE: '3 пересадки',
};

const stops = [
  {
    value: 0,
    label: labels.WITHOUT,
  },
  {
    value: 1,
    label: labels.ONE,
  },
  {
    value: 2,
    label: labels.TWO,
  },
  {
    value: 3,
    label: labels.THREE,
  },
];

const CURRENCY = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR',
};

const Sidebar = ({location}) => {
  const updateCurrencyQuery = currency => addQueryParams(location.search, {
    currency: currency === CURRENCY.RUB ? undefined : currency,
  });
  const allStops = Object.keys(stops).reduce((res, idx) => res.concat(stops[idx].value), []);
  return (
    <div className="sidebar">
      <div className="currencies">
        {Object.keys(CURRENCY).map(cur => (
          <NavLink
            key={cur}
            className="currency"
            activeClassName="currency_selected"
            isActive={(match, location) => {
              const currentCur = queryString.parse(location.search).currency;
              return (currentCur || CURRENCY.RUB) === cur;
            }}
            to={{ pathname: '/', search: updateCurrencyQuery(cur) }}
          >
            {cur}
          </NavLink>
        ))}
      </div>
      <div className="transfers">
        <div className="stop-row">
          <NavLink
            className="stop"
            activeClassName="stop_selected"
            isActive={isStopActive(allStops)}
            to={{ pathname: '/', search: updateStopQuery({value: allStops, search: location.search})}}
          >
            {labels.ALL}
          </NavLink>
        </div>
        {Object.keys(stops).map(key => (
          <StopRow
            stop={stops[key]}
            search={location.search}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

export default withRouter(Sidebar);