import React from 'react';
import {withState} from 'recompose';
import { Link, NavLink } from "react-router-dom";

import {updateStopQuery, addQueryParams, isStopActive} from './../queryStringUtils';

const enhance = withState('isHovered', 'setHover', false);
const labels = {
  ONLY: 'Только',
};

const Row = enhance(({stop, search, isHovered, setHover, ...props}) => (
    <div className="stop-row"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}>
      <NavLink
        className="stop"
        activeClassName="stop_selected"
        isActive={isStopActive(stop.value)}
        to={{ pathname: '/', search: updateStopQuery({value: stop.value, search})}}
      >
        {stop.label}
      </NavLink>
      {isHovered ? (
        <Link
          className="stop-only"
          to={{ pathname: '/', search: addQueryParams(search, {stops: stop.value})}}
        >
          {labels.ONLY}
        </Link>
      ) : null}
    </div>
  )
);

export default Row;
