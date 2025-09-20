import axios from "axios";

// Base URL of the API
export const BASEURL = 'https://upskilling-egypt.com:3000/api/v0/portal/users/';
// Base URL of the API admin
export const BASEURLADMIN = 'https://upskilling-egypt.com:3000/api/v0/admin/users';
export const BASEURLDEV =`https://upskilling-egypt.com:3000`
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


export const Facilities_URL = {
GETALL: `${BASEURLDEV}/api/v0/admin/room-facilities`,
CREATE: `${BASEURLDEV}/api/v0/admin/room-facilities`,
DELETE: `${BASEURLDEV}/api/v0/admin/room-facilities/6596c316a97d4df2f140e117`,
UPDATE: `${BASEURLDEV}/api/v0/admin/room-facilities/6596c316a97d4df2f140e117`,
DETAILS: `${BASEURLDEV}/api/v0/admin/room-facilities/6596c316a97d4df2f140e117`,

};