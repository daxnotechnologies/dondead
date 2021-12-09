const actions = {
  TICKETS_BEGIN: 'TICKETS_BEGIN',
  TICKETS_SUCCESS: 'TICKETS_SUCCESS',
  TICKETS_ERR: 'TICKETS_ERR',

  ticketsBegin: () => {
    return {
      type: actions.TICKETS_BEGIN,
    };
  },

  ticketsSuccess: data => {
    return {
      type: actions.TICKETS_SUCCESS,
      data,
    };
  },

  ticketsErr: err => {
    return {
      type: actions.TICKETS_ERR,
      err,
    };
  },
};

export default actions;
