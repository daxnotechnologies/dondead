import axios from 'axios';
import Cookies from 'js-cookie';

// const API = axios.create({
//   baseURL: 'http://localhost:8080/',
// });

const API = axios.create({
  baseURL: 'https://dondead-server.uc.r.appspot.com/',
});

API.interceptors.request.use(req => {
  if (Cookies.get('token')) {
    req.headers.authorization = `Bearer ${Cookies.get('token')}`;
  }

  return req;
});

export const login = userdata => API.post(`admin/login`, userdata);
// export const signup = userdata => API.post(`admin/signup`, userdata);
export const getProfile = () => API.get('admin/profile');
export const addProduct = product => API.post('product/new', product);
export const getAllProduct = () => API.get('product/');
export const getProduct = slug =>
  API.get('product/one', {
    params: {
      slug,
    },
  });

export const getOffers = () => API.get('offer/');
