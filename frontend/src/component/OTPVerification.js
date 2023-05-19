import React from 'react'
import useAuth from '../hooks/useAuth'
import PhoneOTP from '../Authtorization/PhoneOTP'
import EmailOTP from '../Authtorization/EmailOTP'
import Home from './Home'
function OTPVerification() {
    const {isOtpThroughMail,auth}=useAuth()
  return (
   !auth.is_verified ?!isOtpThroughMail ? <PhoneOTP/>:<EmailOTP/>:<Home/>
  )
}

export default OTPVerification
