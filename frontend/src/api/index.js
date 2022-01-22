import axios from "axios";
import Cookies from "js-cookie";
import token from "../../../server/models/token";

// const API = axios.create({
//   baseURL: "http://localhost:8080/",
// });

const API = axios.create({
  baseURL: "https://dondead-server.uc.r.appspot.com/",
});

API.interceptors.request.use((req) => {
  if (Cookies.get("token")) {
    req.headers.authorization = `Bearer ${Cookies.get("token")}`;
  }

  return req;
});

export const login = (userdata) => API.post(`user/login`, userdata);
export const signup = (userdata) => API.post(`user/signup`, userdata);
export const getProfile = () => API.get("user/profile");
export const getAllProduct = () => API.get("product/");
export const getProduct = (slug) =>
  API.get("product/one", {
    params: {
      slug,
    },
  });

export const newOffer = (offer) => API.post("offer/new", offer);

export const getOffers = (offererID) =>
  API.get("offer/profile", {
    params: {
      offererID,
    },
  });

export const cancelOffer = (offer) => API.post("offer/cancel", offer);
export const paypalUpdate = (user) => API.patch("user/update", user);

export const newTicket = (ticket) => API.post("ticket/post", ticket);

export const updateBilling = (billing) => API.patch("user/billing", billing);

export const check = (token) => API.post("user/checkToken", token);
export const reset = (token) => API.post("user/reset", token);

// https://dondead-server.uc.r.appspot.com/user/checkToken
// https://dondead-server.uc.r.appspot.com/user/reset
// https://dondead-server.uc.r.appspot.com/user/forgotPassword
