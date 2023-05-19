import React, { useState } from 'react'
import {Box,Button,Dialog,DialogActions,DialogContent,DialogContentText, useMediaQuery,DialogTitle,TextField, Alert} from '@mui/material'
import  useAuth  from '../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailPhoneVerify({user,openDialog,setOpenDailog}) {
    const [otp,setOtp]=useState({});
    const [error,setError]=useState({show:false,message:""});
    const navi=useNavigate();
    const theme=useMediaQuery('(max-width: 600px)');
    const{setUpRecaptcha}=useAuth();
    const handlePhoneOtp= event =>{
        setOtp(prevState=>({ ...prevState, phonNumber:event.target.value }))
    }
    const handleEmailOtp=event=>{
        setOtp(prevState=>({ ...prevState, email:event.target.value }))
    }
    const verifyHuman=()=>{
        let number=`+91${String(user.phone_number)}`
        setUpRecaptcha(number).then((result)=>{ 
          console.log(result)
          setOtp(prevState=>({ ...prevState, confirmObj:result } ))
          return axios.get(`http://localhost:8888/otp/noauthOTP/${user.email}`,{withCredentials:true})}).then((response =>{
            setError(prevState=>({ ...prevState, show:false,message:"Error Occurred while Generating OTP" }))
          })).catch(e=>{
            setError(prevState=>({ ...prevState, show:true,message:"Error Occurred while Generating OTP" }))
          })
        }
     
    const verifyOtp=()=>{
        axios.get(`http://localhost:8888/otp/noauth/otp/verify/${otp.email}`,{withCredentials:true}).then((res) => {
            if(res.status===200){
                 console.log("firebase...")
                otp.confirmObj.confirm(otp).then((result)=>{
                  console.log(" in firebase")
                   return result.user.getIdToken()
                    }).then(authToken =>{
                      console.log("firebase confirm")
                      return axios.post(`http://localhost:8888/user/signup`,user,{ headers: {
                        Authorization: `Bearer ${authToken}`,
                      },withCredentials:true} )
                   }).then((response =>navi('/login'))).catch((e)=>{ setError(prevState=>({ ...prevState, show:true,message:"Error Occured during sign up try again after some time" }))})
            }
          }).catch((e)=>{ { console.log(e)
            setError(prevState=>({ ...prevState, show:true,message:"InVaild OTP" }))}})

    }
  return (
   <Dialog open={openDialog} onClose={()=>{setOpenDailog(false)}}>
     <DialogContent>
     <DialogContentText>
        { error.show &&  <Alert severity='error'>{error.message}</Alert>}
       <TextField className='input-container' size={ theme? 'small' : 'large' } label="Enter Mobile Otp" required type="number" onChange={handlePhoneOtp} sx={{width:300,marginBottom:3}}></TextField>
        <br/>
       <TextField  className='input-container' size={ theme? 'small' : 'large' } label="Enter Email Otp" required type="number" onChange={handleEmailOtp} sx={{width:300,marginBottom:3}}></TextField>
        <br/>
        <div id='recaptcha'></div>
      </DialogContentText>
      <DialogActions>
      <Button onClick={verifyHuman}>Verify Your Human</Button>
      <Button onClick={verifyOtp}>Verify</Button>
      </DialogActions>
    </DialogContent>

   </Dialog>
  )
}
export default EmailPhoneVerify
