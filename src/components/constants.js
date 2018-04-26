import labels from './labels';

export const CURRENCY = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR',
};

export const STOP_DELIMITER = ':';

export const STOPS = [
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
