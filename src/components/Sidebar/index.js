import React from 'react';
import { withRouter } from 'react-router'
import queryString from 'query-string';

import { Link, NavLink } from "react-router-dom";

const isTransferActive = (match, location) => {

};

const DELIMITER = ':';

const buildTransferQueryParam = ({value, search}) => {
  if (![].concat(value).length) {
    return '';
  }
  const searchObj = queryString.parse(search);
  const {transfers: queryTransfers} = searchObj;
  const transfers = (queryTransfers || '').split(DELIMITER).map(i => parseInt(i));
  const isCurrentTransferSelected = transfers.includes(value);
  const updatedTransfers = isCurrentTransferSelected ?
    transfers.filter(t => t !== value) :
    transfers.concat(value);
  return queryString.stringify({
      ...searchObj,
      transfers: updatedTransfers.join(DELIMITER),
    });
};

const Row = ({transfer, location, ...props}) => {
  return (
    <div className="transfer-row">
      <NavLink
        className="transfer-checkbox"
        activeClassName="transfer-checkbox_active"
        isActive={isTransferActive}
        to={{ pathname: '/', search: buildTransferQueryParam({value: transfer.value, search: location.search})}}
        >
        {transfer.label}
      </NavLink>
    </div>
  );
};

const TransferRow = withRouter(Row);

const labels = {
  ALL: 'Все',
  WITHOUT_TRANSFERS: 'Без пересадок',
  ONE_TRANSFER: '1 пересадка',
  TWO_TRANSFERS: '2 пересадки',
  THREE_TRANSFERS: '3 пересадки',
};

const transfers = [
  {
    value: [],
    label: labels.ALL,
  },
  {
    value: 0,
    label: labels.WITHOUT_TRANSFERS,
  },
  {
    value: 1,
    label: labels.ONE_TRANSFER,
  },
  {
    value: 2,
    label: labels.TWO_TRANSFERS,
  },
  {
    value: 3,
    label: labels.THREE_TRANSFERS,
  },
];

const Sidebar = ({selectedTransfers = [], currency}) => {
  return (
    <div className="sidebar">
      <div className="currency">

      </div>
      <div className="transfers">
        {Object.keys(transfers).map(key => (
          <TransferRow
            transfer={transfers[key]}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar