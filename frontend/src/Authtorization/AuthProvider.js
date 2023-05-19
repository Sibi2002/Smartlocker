import { RecaptchaVerifier } from 'firebase/auth';
import React, { useState,useEffect } from 'react'
import { createContext } from 'react';
import { Auth } from './Firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

const AuthContext = createContext({});
 export const AuthProvider =({children})=>{
    const [isOtpThroughMail,setIsOtpThroughMail]=useState(false)
    const [auth,setAuth]=useState(null);
    const [macId,setMacId]=useState(null);
    const setUpRecaptcha= async (number)=>{
      const recaptchaVerifier=new RecaptchaVerifier('recaptcha',{},Auth);
      recaptchaVerifier.render()
      return signInWithPhoneNumber(Auth,number,recaptchaVerifier)
    }

    return <AuthContext.Provider value={{auth,setAuth,macId,setMacId,isOtpThroughMail,setIsOtpThroughMail,setUpRecaptcha}}>{children}</AuthContext.Provider>
}
export default AuthContext