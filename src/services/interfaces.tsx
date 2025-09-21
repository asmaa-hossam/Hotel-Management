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