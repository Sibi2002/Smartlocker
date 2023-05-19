import  AuthContext from "../Authtorization/AuthProvider"
import { useContext } from "react";

const useAuth =() =>{
    return useContext(AuthContext);
}
export default useAuth