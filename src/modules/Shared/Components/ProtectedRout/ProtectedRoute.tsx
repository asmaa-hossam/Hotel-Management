import { useAuthContext } from "../../../../Context/Context";
import { Navigate } from "react-router-dom";
import type {PropsType} from '../../../../services/interfaces'
export default function ProtectedRoute({children}:PropsType) {
 let {loginData}=useAuthContext()
 
  if(localStorage)


 if(localStorage.getItem("token")||loginData?.userGroup==="admin"){
  return <>{children}</>;
 }
 else{
  <Navigate to='/login'/>
 }

 
}
