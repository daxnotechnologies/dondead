import actions from './actions';
// import staticData from '../../demoData/orders.json';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const { TICKETS_BEGIN, TICKETS_SUCCESS, TICKETS_ERR } = actions;

const ticketsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case TICKETS_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case TICKETS_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case TICKETS_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
