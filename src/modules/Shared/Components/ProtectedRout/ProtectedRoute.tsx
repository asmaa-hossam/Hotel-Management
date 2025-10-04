import { useAuthContext } from "../../../../Context/Context";
import { Navigate } from "react-router-dom";
import type {PropsType} from '../../../../services/interfaces'
export default function ProtectedRoute({children}:PropsType) {
 let {loginData}=useAuthContext()
 
  if(loginData?.role==='user'){
 return <Navigate to='/home'/>

  }


 if(localStorage.getItem("token")||loginData?.role==="admin"){
  return <>{children}</>;
 }
 else{
 return <Navigate to='/login'/>
 }

 
}
