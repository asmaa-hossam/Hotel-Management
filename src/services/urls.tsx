import axios from "axios";

// Base URL of the API
export const BASEURL = 'https://upskilling-egypt.com:3000/api/v0/portal/users/';
// Base URL of the API admin
export const BASEURLADMIN = 'https://upskilling-egypt.com:3000/api/v0/admin/';
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
UPDATE: (id: string) =>`${BASEURLDEV}/api/v0/admin/room-facilities/${id}`,  
DELETE: (id: string) =>`${BASEURLDEV}/api/v0/admin/room-facilities/${id}`, 
DETAILS:(id: string) =>`${BASEURLDEV}/api/v0/admin/room-facilities/${id}`,


};

export const BOOKING_URL = {
  GETALL: `${BASEURLDEV}/api/v0/admin/booking?page=1&size=10`, 
  DELETE: `${BASEURLDEV}`,  
  // GETBOOKINGETAIL: (id: string) => ``,  
};

export const ads_URL = {
  FETCH: `${BASEURLADMIN}ads`, 
  CREATE: `${BASEURLADMIN}ads`,  
  UPDATE: (id: string) => `${BASEURLADMIN}ads/${id}`,  
  DELETE: (id: string) => `${BASEURLADMIN}ads/${id}`, 
  GETADS:`${BASEURLDEV}/api/v0/portal/ads`
};

export const DASHBOARD_URL = {
  DASHCARDS: `${BASEURLADMIN}dashboard`, 
 
};

//roomsEndPOint

export const ROOMS_URLS={
GETALLROOMS:`${BASEURLADMIN}rooms`,
CREATEROOM:`${BASEURLADMIN}rooms`,
UBDATEROOM:(id:string)=>`${BASEURLADMIN}rooms/${id}`,
GETFACILITES:`${BASEURLADMIN}room-facilities`,
GET_ROOM_BY_ID:(id:string)=>`${BASEURLADMIN}rooms/${id}`,
DELETEROOM:(id:string)=>`${BASEURLADMIN}rooms/${id}`,
GETALLUSER:`${BASEURLADMIN}users`

}
//users Url

export const USERS_URL={
  GETALLROOMS:`https://upskilling-egypt.com:3000/api/v0/portal/rooms/available`
}

export const ads_PORTAL_URL = {
  FETCH: `${BASEURLDEV}/api/v0/portal/ads`,
};
// favorites URLs
export const FAVORITES_URL = {
  BASE: `${BASEURLDEV}/api/v0/portal/favorite-rooms`,
};
