import Cookies from "js-cookie";
import actions from "./actions";
import * as api from "../../api";
const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = actions;

const login = (loginForm, history) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());

      const {
        data: { token },
      } = await api.login(loginForm);

      Cookies.set("ftoken", token);
      dispatch(loginSuccess(token));
      history.push("/account");
    } catch (err) {
      dispatch(loginErr(err));
      console.log(err.message);
    }
  };
};

const logOut = (history) => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      Cookies.remove("ftoken");
      history.push("/");
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
