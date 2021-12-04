const actions = {
  PROFILE_BEGIN: "PROFILE_BEGIN",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",
  PROFILE_ERR: "PROFILE_ERR",

  POST_DATA_BEGIN: "POST_DATA_BEGIN",
  POST_DATA_SUCCESS: "POST_DATA_SUCCESS",
  POST_DATA_ERR: "POST_DATA_ERR",

  profileBegin: () => {
    return {
      type: actions.PROFILE_BEGIN,
    };
  },

  profileSuccess: (data) => {
    return {
      type: actions.PROFILE_SUCCESS,
      data,
    };
  },

  profileErr: (err) => {
    return {
      type: actions.PROFILE_ERR,
      err,
    };
  },

  postDataBegin: () => {
    return {
      type: actions.POST_DATA_BEGIN,
    };
  },

  postDataSuccess: (data) => {
    return {
      type: actions.POST_DATA_SUCCESS,
      data,
    };
  },

  postDataErr: (err) => {
    return {
      type: actions.POST_DATA_ERR,
      err,
    };
  },
};

export default actions;
