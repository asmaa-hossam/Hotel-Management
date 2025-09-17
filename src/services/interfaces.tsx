import  type {ReactNode } from "react";


export interface ILoginData{
    userEmail:string
   userGroup:string
   userId:string
    userName:string

}
export interface PropsType{
    children:ReactNode
}
export interface ContextType{
    SaveLogenData:()=>void
    loginData:ILoginData|null
    logOut:()=>void
}