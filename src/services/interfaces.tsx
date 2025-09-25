import  type {ReactNode } from "react";


export interface ILoginData{
    role:string
  verified:boolean
_id:string

}
export interface PropsType{
    children:ReactNode
}
export interface ContextType{
    SaveLogenData:()=>void
    loginData:ILoginData|null
    logOut:()=>void
}

export interface ChangePasswordData{
     oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ChangePasswordRes{
    message:string
   success:boolean

}

//dashboard graph
export interface DashboardData {
  rooms: number;
  facilities: number;
  ads: number;
}
export interface IDashboardData {
  bookings: {
    pending: number;
    completed: number;
  };
  users: {
    user: number;
    admin: number;
  };
}

//ads page
export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
}

export interface User {
  userName: string;
}

export interface Ad {
  _id: string;
  isActive: boolean;
  room: Room | string;
  createdBy: User;
  createdAt: string;
  discount: number;
}
export interface Fasilites{
  _id:string,
  name:string
}
export interface RoomsData{
capacity:number,
discount:number,
facilities:Fasilites[],
price:number,
roomNumber:number,
_id:string
 createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;

}
export interface ResRoomData{
  message:string
success:boolean
data:{'rooms':RoomsData[],"totalCount":number}

}
export interface RoomAs{

            roomNumber:string,
            price:string,
            capacity:string,
            discount:string,
            facilities:string [],
            createdBy: string,
            images:string [],
            _id: string,
            createdAt: string,
            updatedAt: string,
            imgs:File[]
        
}
export interface CreatRoomRes{
  success:boolean,
  message:string,
  data:{
    room:RoomAs
  }
}

export interface Facility {
  name: string;
  _id: string;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
  phoneNumber:string
  role:string
  verified:boolean
  // ... any other fields
}

export interface UserRes{
  success: boolean,
    message: string,
    data:{users:User[]}
    totalCount:number
}