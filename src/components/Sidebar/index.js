import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { updateStopQuery, addQueryParams, isStopActive } from './../queryStringUtils';
import { CURRENCY, STOPS } from './../constants';
import labels from './../labels';
import StopRow from './StopRow';

const Sidebar = ({ location }) => {
  const updateCurrencyQuery = currency => addQueryParams(location.search, {
    currency: currency === CURRENCY.RUB ? undefined : currency,
  });
  const allStops = Object.keys(STOPS).reduce((res, idx) => res.concat(STOPS[idx].value), []);
  return (
    <div className="sidebar">
      <div className="sidebar-section-title">{labels.CURRENCY}</div>
      <div className="currencies">
        {Object.keys(CURRENCY).map(cur => (
          <NavLink
            key={cur}
            className="currency"
            activeClassName="currency_selected"
            isActive={(match, loc) => {
              const currentCur = queryString.parse(loc.search).currency;
              return (currentCur || CURRENCY.RUB) === cur;
            }}
            to={{ pathname: '/', search: updateCurrencyQuery(cur) }}
          >
            {cur}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-section-title">{labels.STOPS_TOTAL}</div>
      <div className="stops">
        <div className="stop-row">
          <NavLink
            className="stop"
            activeClassName="stop_selected"
            isActive={isStopActive(allStops)}
            to={{ pathname: '/', search: updateStopQuery({ value: allStops, search: location.search }) }}
          >
            {labels.ALL}
          </NavLink>
        </div>
        {Object.keys(STOPS).map(key => (
          <StopRow
            stop={STOPS[key]}
            search={location.search}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(Sidebar);
