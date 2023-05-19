import React, { useState } from 'react'
import { Box,TextField,Paper,useMediaQuery, Alert,InputAdornment,IconButton} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import './css/login.css'
import tasker from'./images/locker.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';


function LogIn() {
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const[showPassword ,setShowPassword]=useState(false)
    const [showAlert,setShowAlert]=useState(false);
    const {macId}=useAuth();
    const navi=useNavigate();
    const theme=useMediaQuery('(max-width: 600px)');
    const instance = axios.create({
      withCredentials:true
  });
    const handleChangeUser=(event)=>{

        setUserName(event.target.value)
    }
    const handleChangePas=(event)=>{
        setPassword(event.target.value)
      
    }
    const accessGranter=()=>{
     instance.post('http://localhost:8888/user/login',{
          user_name:username,
          password:password,
          mac_id:macId
        }).then(response =>{
          
          if(response.status===200){
            setShowAlert(false); 
            window.location.reload();
          }
        }).catch(error =>{if (error.response.status===404 || error.response.status===401 ){
          setShowAlert(true);
        }
        })
        
    }
  return (
    <div id='login'>  
    <Paper id="grider" elevation={12} >  
    <img className='locker_img'alt='Locker' src={tasker}></img>
     <Box className='logincontainer' > 
      {showAlert && <Alert severity='error' sx={{width:"90%",margin:"auto"}}>Invalid User name or Password</Alert>}
      <Avatar className='login-avatar' sx={theme? {height:40,width:40,marginTop:2} :{height:70,width:70,marginTop:2}} />    
        <TextField  label="User Name" size={ theme? 'small' : 'large' }  required type="text" onChange={handleChangeUser} sx={{marginTop:2,width:"80%"}} ></TextField>
        <br/>
        <TextField  label="Password" size={ theme? 'small' : 'large' } required  onChange={handleChangePas} sx={{marginTop:2,width:"80%"}}
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
        <Button variant='contained' onClick={accessGranter}  sx={theme?{marginBottom:1,fontSize:10,margin:2}:{margin: 2}}>LogIn</Button>
        <br/>
        <a className='Signuplink' href='/signup'> Don't have an account Sign Up</a>
      </Box>
     </Paper >
     </div>
  )
}

export default LogIn