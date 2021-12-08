import { getAllUsers } from '../../api';
import actions from './actions';

const { sellerBegin, sellerSuccess, sellerErr } = actions;

const sellerFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(sellerBegin());

      const { data } = await getAllUsers();

      // const data = initialState.filter(item => {
      //   if (value !== '') {
      //     return item[column] === value;
      //   }
      //   return item;
      // });

      dispatch(sellerSuccess(data));
    } catch (err) {
      dispatch(sellerErr(err));
    }
  };
};

export { sellerFilter };
