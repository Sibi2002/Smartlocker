import  useAuth  from "./useAuth";
import axios from "axios";

export const useCookie=()=>{
    const { setAuth }=useAuth();
    const refersh= async ()=>{
         let response=await axios.get('http://localhost:8888/api/verify', {withCredentials:true })
            setAuth(response.data)
           
            console.log(response.data)
    }
  return refersh;
}