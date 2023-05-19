import { Navigate } from 'react-router-dom'
import useAuth  from '../hooks/useAuth'
export default function UserLog({children}) { 
  const {auth}=useAuth();
  if(auth){
      return <Navigate to ='/'/>
  }
  return (
    children
  )
}