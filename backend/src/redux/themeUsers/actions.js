const actions = {
  THEME_USER_BEGIN: 'THEME_USER_BEGIN',
  THEME_USER_SUCCESS: 'THEME_USER_SUCCESS',
  THEME_USER_ERR: 'THEME_USER_ERR',

  changeUserBegin: () => {
    return {
      type: actions.THEME_USER_BEGIN,
    };
  },

  changeUserSuccess: data => {
    return {
      type: actions.THEME_USER_SUCCESS,
      data,
    };
  },

  changeUserErr: err => {
    return {
      type: actions.THEME_USER_ERR,
      err,
    };
  },
};

export default actions;
