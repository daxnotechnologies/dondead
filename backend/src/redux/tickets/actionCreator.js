import actions from './actions';
import { getTickets } from '../../api';

const { ticketsBegin, ticketsErr, ticketsSuccess } = actions;

const ticketFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(ticketsBegin());

      const { data } = await getTickets();

      // const data = initialState.filter(item => {
      //   if (value !== '') {
      //     return item[column] === value;
      //   }
      //   return item;
      // });

      dispatch(ticketsSuccess(data));
    } catch (err) {
      dispatch(ticketsErr(err));
    }
  };
};

export { ticketFilter };
