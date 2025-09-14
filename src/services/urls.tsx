import axios from "axios";

// Base URL of the API
export const BASEURL = 'https://upskilling-egypt.com:3000/api/v0/portal/users/';

// HTTP Headers
export const HEADERS = {
  Authorization: localStorage.getItem("token"),
  "Content-Type": "application/json",
};

// Axios Instance
export let axiosinstant = axios.create({
  baseURL: BASEURL,
  headers: HEADERS,
});

// auth Endpoints
export const Auth_URL = {
RESETPASSWORD: 'reset-password',
REGISTER: '',
FORGETASSWORD: 'forgot-password',
CHANGEPASSWORD: 'change-password',
 LOGIN: `${BASEURL}login`,

};
