import { Typography,Box, Button,Dialog,DialogActions,DialogContent,DialogContentText, useMediaQuery,DialogTitle,TextField, CircularProgress} from '@mui/material'
import React, { useState } from 'react';
import  useAuth  from '../hooks/useAuth';
import axios from 'axios';
import './css/Home.css'


function Home() {
  const[changePhNo,setChangePhNo]=useState(false)
  const[changeEmail,setChangeEmail]=useState(false)
  const[email,setEmail]=useState(false);
  const[config,setConfig]=useState(true);
  const[phoneNumber,setPhoneNumber]=useState()
  const[otp,setOtp]=useState()
  const[conObj,setConObj]=useState()
  const{auth,setUpRecaptcha}=useAuth()
  const[error,setError]=useState({email:false,phonNumber:false,otp:false})
  const theme=useMediaQuery('(max-width: 600px)');
  const genrateOtpMobile=()=>{
    let number=`+91${String(phoneNumber)}`
    setUpRecaptcha(number).then((result)=>{console.log(result)
    setConObj(result)}).catch((e)=>{console.error(e)})
   }
   const resendOTP=()=>{
    axios.get(`http://localhost:8888/otp/resend_otp`,{withCredentials:true}).then()
   }
  
  const generateOtpEmail=()=>{
    axios.get(`http://localhost:8888/otp/generate_otp/${email}`,{withCredentials:true}).then(()=>{
      document.getElementById('emailgen').style.display='none'
      document.getElementById('emailresend').style.display='inline'
    })
  }
  const handleKeyPress=(event)=>{
    const regex = /^[0-9\b]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }
  const handleChangeOTP=(event)=>{
    setOtp(event.target.value)
  }
  const handleChangePhone=(event)=>{
    const regex=/^\d{10}$/;
    if(regex.test(event.target.value)){
      setPhoneNumber(event.target.value)
      setError(prevState=>({ ...prevState, phonNumber:false }))
    }
    else{
      setError(prevState=>({ ...prevState, phonNumber:true }))
    }
  }
  const handleChangeEmail=(event)=>{
    const emailRegex= /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g
    let validEmail=event.target.value
    if(emailRegex.test(validEmail)){
      setEmail(event.target.value)
      setError((prevState)=>({ ...prevState, email: false }))
    }
    else{
      setError((prevState)=>({ ...prevState, email: true }))
    }
  }
  const verifyMobile=()=>{
    conObj.confirm(otp).then((result)=> result.user.getIdToken()).then(authToken =>{
     axios.post(`http://localhost:8888/user/mobile_number/${phoneNumber}/${auth.user_name}`,{ },{ headers: {
      Authorization: `Bearer ${authToken}`,
    },  withCredentials: true, }).then((result)=>{
      window.location.reload()
     }).catch(e=>console.log(e))
    })
  }
  const verifyEmail=()=>{
      axios.get(`http://localhost:8888/otp/verify_otp/${otp}`,{withCredentials:true}).then((res) => {
        if(res.status===200){
          axios.post(`http://localhost:8888/user/email/${email}/${auth.user_name}`,{},{withCredentials:true}).then((result)=>{
            window.location.reload();
           })
        }
      }).catch((e)=>{alert('Invalid OTP')})
  }
  const changeFinger1=()=>{
    setConfig(true)
   axios.get(`http://192.168.220.164/changeFinger/1`).then(r=>setConfig(false)).catch(e=>{alert('Fingerchange Failed')
   setConfig(false)
 })
  }
  const changeFinger2=()=>{
    axios.get(`http://192.168.220.164/changeFinger/2`).then(r=>setConfig(false)).catch(e=>{alert('Fingerchange Failed')
    setConfig(false)
  })
   }
  return (
    config ?
   <Box sx={{textAlign:'center',margin:'2%',display:"flex",flexDirection:"column", alignItems:"center"}}>
   <Typography variant='h4'>Welcome {auth.user_name}</Typography>
    <table border="1px">
      <thead>
        <tr>
          <th colSpan="2">Your Details</th> 
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Email</td>
          <td>{auth.email}</td>
        </tr>
        <tr>
          <td>PhoneNumber</td>
          <td>{auth.phone_number}</td>
        </tr>
        <tr>
        <td>Change Verification Email</td>
          <td><Button onClick={()=>setChangeEmail(true)}>Click here</Button></td>
        </tr>
        <tr> 
        <td>Change Mobile Number</td>
          <td><Button onClick={()=>setChangePhNo(true)}>Click here</Button></td>
        </tr>
        <tr>
        <td>Change Manager Finger Print</td>
          <td><Button id='finger' onClick={changeFinger1}>Click here</Button></td>
        </tr>
        <tr>
        <td>Change Customer Finger Print</td>
          <td><Button id='finger' onClick={changeFinger2}>Click here</Button></td>
        </tr>
      </tbody>
    </table>
   <Dialog open={changePhNo} onClose={()=>{setChangePhNo(false)}}>
    <DialogTitle>Change Mobile Number</DialogTitle>
    <DialogContent>
      <DialogContentText>
      <TextField className='input-container' size={ theme? 'small' : 'large' } label="PhoneNumber" error={error.phonNumber} required type="number" onChange={handleChangePhone} onKeyPress={handleKeyPress} sx={{width:300,marginBottom:3,marginTop:3}}></TextField>
        <br/>
      <TextField  className='input-container' size={ theme? 'small' : 'large' } label="Enter Otp" required type="number" onChange={handleChangeOTP} sx={{width:300,marginBottom:3}}></TextField>
        <br/>
        <div id='recaptcha'></div>
      </DialogContentText>
      <DialogActions>
      <Button onClick={genrateOtpMobile}>Generate otp</Button>
      <Button onClick={verifyMobile}>Verify</Button> 
      
      </DialogActions>
    </DialogContent>
   </Dialog>
   <Dialog open={changeEmail} onClose={()=>{setChangeEmail(false)}}>
    <DialogTitle>Change Email</DialogTitle>
    <DialogContent>
      <DialogContentText>

      <TextField className='input-container' size={ theme? 'small' : 'large' } label="Email" error={error.email} required type="text" onChange={handleChangeEmail}  sx={{width:300,marginBottom:3,marginTop:3}}></TextField>
        <br/>
      <TextField className='input-container' size={ theme? 'small' : 'large' } label="Enter Otp" required type="number" onChange={handleChangeOTP}  onKeyPress={handleKeyPress}  sx={{width:300,marginBottom:3}}></TextField>
      
      </DialogContentText>
      <DialogActions>
      <Button id='emailgen' onClick={generateOtpEmail}>Generate otp</Button>
      <Button id='emailresend' sx={{display:'none'}} onClick={resendOTP}>Resend</Button>
      <Button id='emailverify' onClick={verifyEmail}>Verify</Button>
   
      </DialogActions>
    </DialogContent>
   </Dialog>
   </Box>:<CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}></CircularProgress>
  )
}

export default Home
