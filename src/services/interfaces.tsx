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