import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useCookie } from '../hooks/useCookie';

function Refresher() {
    const [isLoading,setIsLoading]=useState(true)
    const {auth}=useAuth();
    const refesh=useCookie();
    useEffect(()=>{
       const verifyAuth = async ()=>{
          try{
           await refesh()
          }
          catch(error){
            console.log(error);
          }
          finally{
            setIsLoading(false)
          }
        }
      auth? setIsLoading(false):verifyAuth() 

    },[])
   
  return (
    isLoading ? <CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}></CircularProgress>:<Outlet></Outlet> )
}

export default Refresher
