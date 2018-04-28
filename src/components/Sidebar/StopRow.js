import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import { Link, NavLink } from 'react-router-dom';

import { updateStopQuery, addQueryParams, isStopActive } from './../queryStringUtils';
import labels from '../labels';

const enhance = withState('isHovered', 'setHover', false);

const Row = enhance(({ stop, search, isHovered, setHover }) => (
  <div
    className="stop-row"
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    <NavLink
      className="stop"
      activeClassName="stop_selected"
      isActive={isStopActive(stop.value)}
      to={{ pathname: '/', search: updateStopQuery({ value: stop.value, search }) }}
    >
      {stop.label}
    </NavLink>
    {isHovered ? (
      <Link
        className="stop-only"
        to={{ pathname: '/', search: addQueryParams(search, { stops: stop.value }) }}
      >
        {labels.ONLY}
      </Link>
    ) : null}
  </div>
));

Row.propTypes = {
  stop: PropTypes.shape({}).isRequired,
  search: PropTypes.string.isRequired,
  isHovered: PropTypes.bool,
  setHover: PropTypes.func,
};

Row.defaultProps = {
  isHovered: false,
  setHover: () => {},
};

export default Row;
