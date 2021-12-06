import actions from './actions';

const initialState = {
  firstName: 'woadud',
  lastName: 'a',
  email: 'woaduda@gmail.com',
  mobile: '01742920502',
  _id: 1,
  loading: false,
};

const { THEME_USER_BEGIN, THEME_USER_SUCCESS, THEME_USER_ERR } = actions;

const themeUsersReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case THEME_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case THEME_USER_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case THEME_USER_BEGIN:
      return {
        ...state,
        err,
        loading: false,
      };

    default:
      return state;
  }
};
export default themeUsersReducer;
