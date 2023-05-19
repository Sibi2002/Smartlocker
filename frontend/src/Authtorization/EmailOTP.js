import { Button, TextField, Paper,useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailOTP() {
    const {auth,isOtpThroughmail,setIsOtpThroughMail,isOtpThroughMail}=useAuth()
    const [code,setCode]=useState();
    const navi=useNavigate();
    const theme=useMediaQuery('(max-width: 600px)');

    const generateOTP=()=>{axios.get(`http://localhost:8888/otp/generate_otp/${auth.email}`,{withCredentials:true}).then(()=>{
      document.getElementById('generate').style.display='none'
      document.getElementById('verify').style.display='inline'
      console.log('working');
    })}
    const handleKeyPress=(event)=>{
      const regex = /^[0-9\b]+$/;
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    }
    const handleOTP=(event)=>{
    setCode(event.target.value)
    }
    const verifyOTP=()=>{
      axios.get(`http://localhost:8888/otp/verify_otp/${code}`,{withCredentials:true}).then((res) => {
        if(res.status===200){
          axios.get(`http://localhost:8888/api/isverified`,{withCredentials:true} ).then(r=>window.location.reload())
        }
      }).catch((e)=>{alert('Invalid OTP')})
      }
    return (
        <Paper sx={{textAlign:'center',position:'absolute',top:'50%',left:"50%",width:'90%',maxWidth:"700px",translate:"-50% -50%"}}>
        <TextField className='input-container' label="Enter OTP" required type="number" size={ theme? 'small' : 'large' } sx={{width:300,margin:"3%"}} onKeyPress={handleKeyPress} onChange={handleOTP}>Enter otp</TextField><br/>
        <Button  id='verify'  variant='contained'sx={{margin:'2%',display:'none'}}  onClick={verifyOTP}>Verify</Button> 
        <Button id='generate'variant='contained'sx={{margin:'2%'}} onClick={generateOTP}>Generate OTP</Button> 
        <Button variant='contained'sx={{margin:'2%'}} onClick={()=>{setIsOtpThroughMail(!isOtpThroughMail)
        console.log(isOtpThroughmail)}}>Use Mobile</Button> 
      </Paper>
    )
    
}

export default EmailOTP
