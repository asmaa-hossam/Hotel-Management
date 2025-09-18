import axios from "axios";

// Base URL of the API
export const BASEURL = 'https://upskilling-egypt.com:3000/api/v0/portal/users/';
// Base URL of the API admin
export const BASEURLADMIN = 'https://upskilling-egypt.com:3000/api/v0/admin/users';

// HTTP Headers
export const HEADERS = {
  Authorization: localStorage.getItem("token"),
  "Content-Type": "application/json",
};

// Axios Instance for admin
export let axiosinstanceAdmin = axios.create({
  baseURL: BASEURLADMIN,
  headers: HEADERS,
});
axiosinstanceAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Instance user
export let axiosinstance = axios.create({
  baseURL: BASEURL,
  headers: HEADERS,
});
axiosinstance.interceptors.request.use(
  (config)=>{
 const token=localStorage.getItem("token")
 if(token){
  config.headers.Authorization=token
 }
 return config
  },
  (error) => Promise.reject(error)
  
)

// auth Endpoints
export const Auth_URL = {
RESETPASSWORD: `${BASEURL}reset-password`,
REGISTER: `${BASEURL}`,
FORGETASSWORD: `${BASEURL}forgot-password`,
CHANGEPASSWORD: 'change-password',
 LOGIN: `${BASEURL}login`,

};
