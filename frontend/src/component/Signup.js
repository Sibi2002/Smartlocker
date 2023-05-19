import React, { useState } from 'react'
import { Box,TextField,Paper,useMediaQuery, Alert,InputAdornment,IconButton} from '@mui/material'
import { Button } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import './css/signup.css';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import locker from'./images/locker.jpg';
import { useNavigate } from 'react-router-dom';
import EmailPhoneVerify from './EmailPhoneVerify';

function Signup() {
   
    const[showPassword ,setShowPassword]=useState(false)
    const[openDialog,setOpenDailog]=useState(false);
    const[user,setUser]=useState({});
    const[Error,setError]=useState({})
    const[showAlert,setShowAlert]=useState(false)
    const theme=useMediaQuery('(max-width: 700px)');
    const navi=useNavigate();
    const handleChangeUser=(event)=>{
      setUser(prevState=>({ ...prevState, user_name:event.target.value }))  
    }
    const handleChangePas=(event)=>{
        setUser(prevState=>({ ...prevState, password:event.target.value }))
        
    }
    const handleChangeemail=(event)=>{
      const emailRegex= /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g
    let validEmail=event.target.value
    if(emailRegex.test(validEmail)){
      setUser(prevState=>({ ...prevState, email:event.target.value }))
      setError(prevState=>({ ...prevState, email:false }))
    }
    else
    setError(prevState=>({ ...prevState, email:true }))
  }
  const handleChangephone=(event)=>{
    const regex=/^\d{10}$/;
    if(regex.test(event.target.value)){
      setError(prevState=>({ ...prevState, phone:false }))
      setUser(prevState=>({ ...prevState, phone_number:event.target.value }))
    }
    else
    setError(prevState=>({ ...prevState, phone:true}))
     
    
}
const handleLockerId=(event)=>{
  setUser(prevState=>({ ...prevState, locker_id:event.target.value }))
}
const handleKeyPress=(event)=>{
  const regex = /^[0-9\b]+$/;
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
}
    const accessChecker=()=>{  
      axios.post('http://localhost:8888/user/user_availability',user).then(response =>{   
        if(response.status===200){
          if(response.data==="Not available"){
            setShowAlert(true)
          setError(prevState=>({ ...prevState, message:"User Name Already exist" }))
          }
          else
           return axios.get(`http://192.168.198.164/macAddress`)   
        }}).then(response =>{
                   setShowAlert(false)
                  return axios.get(`http://localhost:8888/locker/${response.data}/${user.locker_id}`)
            }).then(response=>{
                   if(response.data==="not found"){
                  setError("Locker Did Not found on the network")
                    setShowAlert(true)
                   }else if(response.data==="found"){
                    setShowAlert(false)
                    setOpenDailog(true)
                   }
                 }).catch(e =>{
                  if(e.staus===502){
                    setError(prevState=>({ ...prevState, message:"Locker didn't found on the network" }))
                  setShowAlert(true)
                  }else{
                  setError(prevState=>({ ...prevState, message:"Locker didn't found on the network" }))
                  setShowAlert(true)
                }

            })        
          }
  return (
    <div id='signup'>  
    <Paper id="signupgrider" elevation={12} >
    <img id='signuplocker_img'alt='locker' src={locker}></img > 
     <Box className='signupcontainer' >
       {showAlert && <Alert severity='error' sx={{margin:2,position:'relative',marginTop:2}}>{Error.message}</Alert>}
        <Avatar sx={theme?{ width: 40,height: 40,margin:'auto',marginTop:1,marginBottom:0}:{ width: 60,height: 60,margin:'auto',marginTop:2,marginBottom:0}} /> 
        <TextField className='input-container' size={theme?'small':'medium'} label="User Name" required type="text" onChange={handleChangeUser} sx={theme?{width:300,margin:5,marginBottom:2}:{width:350,margin:5,marginBottom:2}}></TextField>
        <br/>
        <TextField className='input-container' size={theme?'small':'medium'} error={Error.email}   label="E-mail" required type="text" onChange={handleChangeemail}  sx={theme?{width:300,marginBottom:2}:{width:350,marginBottom:2}}></TextField>
        <br/>
        <TextField className='input-container' size={theme?'small':'medium'} error={Error.phone}  label="Mobile Number" required type="number" onChange={handleChangephone} onKeyPress={handleKeyPress}  sx={theme?{width:300,marginBottom:2}:{width:350,marginBottom:2}}></TextField>
        <br/>
        <TextField className='input-container' size={theme?'small':'medium'}  label="Password" required  onChange={handleChangePas}  sx={theme?{width:300,marginBottom:2}:{width:350,marginBottom:2}}
                  type={showPassword ? 'text' : 'password'}InputProps={{endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}      
        ></TextField>
        <br/>
        <TextField size={theme?'small':'medium'} type='number' label='Locker Id' required onChange={handleLockerId} onKeyPress={handleKeyPress}   sx={theme?{width:300,marginBottom:2}:{width:350,marginBottom:2}} ></TextField>
        <br/>
        <Button variant='contained' size={theme?'small':'medium'} disabled={!user.password | !user.user_name  | Error.phone | Error.email | !user.locker_id } onClick={accessChecker}  sx={theme ? {forntSize:8,marginBottom:2}:{marginBottom:2}}>SignUp</Button>
        <br/>
        <a className='loginlink' href='login'> Already has an account LogIn</a>
      </Box>
     </Paper>
     <EmailPhoneVerify {...{user,openDialog,setOpenDailog}} ></EmailPhoneVerify>
     </div>
  )
} 

export default Signup
