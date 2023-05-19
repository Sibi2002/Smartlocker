import React from 'react'
import {AppBar,Toolbar,IconButton,Typography,Stack,useMediaQuery, Button} from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import axios from 'axios'
const Navigation= () =>{
   const navi=useNavigate();
   const { auth }= useAuth();
   const theme=useMediaQuery('(max-width: 600px)');
   const logout = async() =>{
    try{let response= await  axios.get('http://localhost:8888/api/deletesession',{ withCredentials:true });
    console.log(response);
    window.location.reload(true);
}
    catch(error){
        console.log(error);
    }    
}
  return (
    <AppBar position="static">
    <Toolbar variant="dense">
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>navi('/')}>
      <LockPersonIcon></LockPersonIcon>
    </IconButton>
    <Typography variant={theme ?'h6':'h5'} component='div' sx={{flexGrow:1}}>Smart Locker</Typography>
    <Stack direction='row' spacing={theme? 1:2}>
    <Button color='inherit' onClick={()=>navi('/about')}>About</Button>{
      !auth && (<Button color='inherit' onClick={()=>{navi('/login')}}>Login</Button> )
    }
    {
      auth && (<Button color='inherit'  onClick={()=>{logout(); navi('/login',{replace:true});}}>Logout</Button>)
    }
    </Stack>
  </Toolbar>
</AppBar>
  )
}

export default Navigation
