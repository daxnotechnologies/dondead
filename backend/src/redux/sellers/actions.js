const actions = {
  SELLER_BEGIN: 'SELLER_BEGIN',
  SELLER_SUCCESS: 'SELLER_SUCCESS',
  SELLER_ERR: 'SELLER_ERR',

  sellerBegin: () => {
    return {
      type: actions.SELLER_BEGIN,
    };
  },

  sellerSuccess: data => {
    return {
      type: actions.SELLER_SUCCESS,
      data,
    };
  },

  sellerErr: err => {
    return {
      type: actions.SELLER_ERR,
      err,
    };
  },
};

export default actions;
