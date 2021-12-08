const actions = {
  SELLER_BEGIN: 'SELLER_BEGIN',
  SELLER_SUCCESS: 'SELLER_SUCCESS',
  SELLER_ERR: 'SELLER_ERR',

  filterOrderBegin: () => {
    return {
      type: actions.SELLER_BEGIN,
    };
  },

  filterOrderSuccess: data => {
    return {
      type: actions.SELLER_SUCCESS,
      data,
    };
  },

  filterOrderErr: err => {
    return {
      type: actions.SELLER_ERR,
      err,
    };
  },
};

export default actions;
