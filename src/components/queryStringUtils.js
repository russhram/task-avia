import queryString from 'query-string';
import {CURRENCY, STOP_DELIMITER} from './constants';

const getStopsFromQuery = (search) => (queryString.parse(search).stops || '').split(STOP_DELIMITER)
  .filter(Boolean).map(i => parseInt(i, 10));

export const addQueryParams = (search, params) => queryString.stringify({
  ...queryString.parse(search),
  ...params,
});

export const updateStopQuery = ({value, search}) => {
  const stops = [].concat(value);
  const stopsFromQuery = getStopsFromQuery(search);
  const isCurrentStopSelected = stops.every(v => stopsFromQuery.includes(v));
  const updatedStops = isCurrentStopSelected ?
    stopsFromQuery.filter(t => !stops.includes(t)) :
    stopsFromQuery.concat(value);
  return addQueryParams(search, {stops: updatedStops.join(STOP_DELIMITER)});
};

export const isStopActive = value => (match, location) => {
  const stops = [].concat(value);
  const stopsFromQuery = getStopsFromQuery(location.search);
  return stops.every(i => stopsFromQuery.includes(i));
};

export const parseCurrencyFromQS = search => queryString.parse(search).currency || CURRENCY.RUB;
