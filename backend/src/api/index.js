import axios from 'axios';
import Cookies from 'js-cookie';

// const API = axios.create({
//   baseURL: 'http://localhost:8080/',
// });

const API = axios.create({
  baseURL: 'https://donedead-server.uc.r.appspot.com/',
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
export const updateProduct = product => API.post('product/update', product);
export const getAllProduct = () => API.get('product/');
export const getProduct = slug =>
  API.get('product/one', {
    params: {
      slug,
    },
  });

export const getOffers = () => API.get('offer/');
export const updateArrive = u => API.patch('offer/arrive', u);
export const updatePayment = u => API.patch('offer/payment', u);
export const updateVerified = u => API.patch('offer/verified', u);
export const updateOffer = u => API.patch('offer/update', u);

export const getOneOffer = id =>
  API.get('offer/one', {
    params: { id },
  });

export const getAllUsers = () => API.get('user/');
export const updateUser = u => API.patch('user/update', u);
export const getUserProfile = id =>
  API.get('admin/user/profile', {
    params: {
      id,
    },
  });

export const getTickets = () => API.get('ticket/');
