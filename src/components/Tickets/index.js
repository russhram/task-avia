import React from 'react';
import {withState, lifecycle, compose} from 'recompose';

const callApi = async () => {
  const response = await fetch('http://localhost:3000/tickets');
  return await response.json();
};

const enhance = compose(
  withState('tickets', 'setTickets', false),
  lifecycle({
    componentDidMount() {
      callApi().then(({tickets}) => {
        this.props.setTickets(tickets)
      })
    }
  })
);

const Tickets = ({tickets}) => {
  return <div>Tickets</div>
};

export default enhance(Tickets);
