import actions from './actions';
import { getProfile } from '../../api';

const { changeUserBegin, changeUserErr, changeUserSuccess } = actions;

export const getProfileRed = () => {
  return async dispatch => {
    try {
      dispatch(changeUserBegin());

      const { data } = await getProfile();
      dispatch(changeUserSuccess(data));
    } catch (err) {
      dispatch(changeUserErr(err));
    }
  };
};
