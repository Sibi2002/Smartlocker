
import React from 'react'
import './css/About.css';

function About() {
  return (
    <div className="container">
      <h3>About SmartLocker</h3>
        <p>
         The Smart Bank Locker System is a cutting-edge security solution designed to provide secure storage options for sensitive environments such 
         as banks, government institutions, and data centres. Using advanced technologies such as fingerprint modules, keypads, WiFi modules, and OTP
         authentication, only authorised personnel can access the locker.
        </p>
        <p>
        The locker requires two individuals to open - a banker/admin and a customer/user - with both individuals placing their fingers on the fingerprint module. 
        An OTP is then sent to the registered email address, which unlocks the locker once entered. The system's multi-factor authentication ensures only 
        authorised personnel can access the locker, providing an added layer of security.
        </p>
    
      
        <p>
        With a React frontend and Springboot backend, administrators can manage registered fingerprints, email addresses, and access logs remotely.
        Built with Arduino and ESP32 for controlling the locker, the system is reliable, efficient, and easy to use. It can be customised to meet
        specific needs, making it an ideal option for banks, government institutions, and individuals who require secure storage.
        </p>
     
        <p>
        Overall, the Smart Bank Locker System provides a high level of customization, reliability, and efficiency, making it a top choice for securing 
        valuable items and sensitive information in a wide range of applications.
        </p>

    </div>  
  )
}

export default About
