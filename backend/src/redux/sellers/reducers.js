import actions from './actions';
const initialState = {
  data: null,
  loading: false,
  error: null,
};

const { SELLER_BEGIN, SELLER_SUCCESS, SELLER_ERR } = actions;

const sellersReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SELLER_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case SELLER_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case SELLER_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export { sellersReducer };
