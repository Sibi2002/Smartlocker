import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from 'axios';

function LockerLocate() {
    const [isLoading,setIsLoading]=useState(true)
    const{auth}=useAuth();
    const {macId,setMacId}=useAuth();
    useEffect(()=>{
       const verifyLocker = async ()=>{
          try{
            axios({url:`http://192.168.220.164/macAddress` ,method:'get'
          }).then(result => axios.get(`http://localhost:8888/locker/${result.data}/${auth.locker_id}`)).then(r=>{
            if(r.data==="found"){
              setMacId(true)
            }
            else{
            setMacId(false)
           
            }
          }).catch(e =>{setMacId(false)
            setTimeout(()=>{
              axios.get('http://localhost:8888/api/deletesession',{ withCredentials:true }).then(r=> window.location.reload());
            },30000)
          })
            
          }
          catch(error){
            console.log(error);
          }
          finally{
            setIsLoading(false)
          }
        }
      macId? setIsLoading(false):verifyLocker() 

    },[])
 
    return (
        isLoading ? <CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}></CircularProgress> : !macId ?<><h>Locker not located</h></>:<Outlet></Outlet> )
}

export default LockerLocate
