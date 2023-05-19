import { Button, TextField,useMediaQuery, Typography,Paper } from '@mui/material'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PhoneOTP() {
   let {auth,setUpRecaptcha,setIsOtpThroughMail,isOtpThroughMail}=useAuth()
  const [code,setCode]=useState()
  const [conObj,setConObj]=useState()
  const navi=useNavigate();
  const theme=useMediaQuery('(max-width: 600px)');
  const generateOTP=()=>{
    document.getElementById('generate-button').style.display='none'
    document.getElementById('verify-button').style.display='inline'
    document.getElementById('verify').style.display='inline'
    let number=`+91${String(auth.phone_number)}`
   setUpRecaptcha(number).then((result)=>{
   setConObj(result)
  }).catch((e)=>{console.error(e)})
 }
  const handleOTP=(event)=>{
  setCode(event.target.value)
  }
  const handleKeyPress=(event)=>{
    const regex = /^[0-9\b]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }
  const verifyOTP=()=>{
    conObj.confirm(code).then((r)=>{
      return r.user.getIdToken()
    }).then(authToken => axios.get(`http://localhost:8888/api/isverified`,{ headers: {
      Authorization: `Bearer ${authToken}`,
    },  withCredentials: true, })).then(r => window.location.reload()).catch((e)=>{alert('Wrong OTP')})
    }
  return ( 
    <Paper sx={{textAlign:'center',position:'absolute',top:'50%',left:"50%",width:'90%',maxWidth:"700px",translate:"-50% -50%"}}>
     <Typography id='verify' variant='h6' sx={{display:'none'}}>Verify recaptcha to get otp </Typography>
     <div id='recaptcha' style={{marginLeft:'30%'}}>
      </div>
      <TextField className='input-container' label="Enter OTP" required type="number" size={ theme? 'small' : 'large' } sx={{width:300,margin:"3%"}} onKeyPress={handleKeyPress} onChange={handleOTP}>Enter otp</TextField><br/>
      <Button id='generate-button'variant='contained'sx={{margin:'2%'}} onClick={generateOTP}>Generate OTP</Button> 
      <Button id='verify-button' variant='contained'sx={{margin:'2%',display:'none'}} onClick={verifyOTP}>Verify</Button> 
      <Button variant='contained'sx={{margin:'2%'}} onClick={()=>setIsOtpThroughMail(!isOtpThroughMail)}>Use Email</Button> 
    </Paper>
  )
}

export default PhoneOTP
