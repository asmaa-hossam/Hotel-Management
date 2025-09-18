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

// Axios Instance
export let axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: HEADERS,
});
axiosinstant.interceptors.request.use(
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
RESETPASSWORD: `/reset-password`,
REGISTER: `${BASEURLADMIN}`,
FORGETASSWORD: `/users`,
CHANGEPASSWORD: 'change-password',
 LOGIN: `${BASEURL}login`,

};
