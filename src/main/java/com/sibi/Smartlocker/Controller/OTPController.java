package com.sibi.Smartlocker.Controller;

import com.sibi.Smartlocker.Model.OTP;
import com.sibi.Smartlocker.Service.EmailService;
import com.sibi.Smartlocker.Service.OTPservice;
import com.sibi.Smartlocker.Utils.Generator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "http://localhost:4000" , allowCredentials = "true", methods = {RequestMethod.POST,RequestMethod.GET})
public class OTPController {
     @Autowired
     EmailService emailService;
     @Autowired
     OTPservice otPservice;
    @GetMapping("/generate_otp/{email}")
    public ResponseEntity<String> generateOTP(@PathVariable String email,HttpServletResponse httpServletResponse,@CookieValue(name = "username", defaultValue = "noauth") String uuid){

        if(!uuid.equals("noauth")) {
            UUID id=UUID.fromString(uuid);
            Integer otp = Generator.generateOTP();
            otPservice.save(Generator.saveOTP(id,otp));
            String body = String.format("Your OTP is %s", otp.toString());
            emailService.sendSimpleEmail(email, "Otp for SmartLocker", body);
            return ResponseEntity.ok().body("OTP Generated");
        }
       return ResponseEntity.status(403).body("your not authorised");
    }
    @GetMapping("/verify_otp/{otp}")
    public ResponseEntity<String> verifyOTP(@PathVariable int otp ,HttpServletResponse response,@CookieValue(name = "username", defaultValue = "noauth") String uuid){
        if(!uuid.equals("noauth")) {
            UUID id=UUID.fromString(uuid);
            if(otp == otPservice.getOTP(id).getOtp()) {
                otPservice.updateVerified(id);
                System.out.println(" ");
                return ResponseEntity.ok().body("OTP Successfully verified");
            }
            return ResponseEntity.badRequest().body("Incorrect OTP");
        }
        return ResponseEntity.status(403).body("your not authorised");
    }
    @GetMapping("/resend_otp")
    public ResponseEntity<String > reSendOTP(String email,@CookieValue(name = "username", defaultValue = "noauth") String uuid,HttpServletResponse response){
        if(!uuid.equals("noauth")) {
            UUID id = UUID.fromString(uuid);
            if(otPservice.getOTP(id)!=null) {
                String body = String.format("Your OTP is %s", otPservice.getOTP(id).getOtp());
                emailService.sendSimpleEmail(email, "Otp for SmartLocker", body);
                return ResponseEntity.ok().body("OTP Successfully send again");
            }
        }
        return ResponseEntity.badRequest().body("No otp found");
    }
    @GetMapping("/noauthOTP/{email}")
    public ResponseEntity<String> noAuthOTP(HttpServletResponse response,@PathVariable String email){
        UUID id=UUID.randomUUID();
        Integer otp=Generator.generateOTP();
        otPservice.save(Generator.saveOTP(id,otp));
        emailService.sendSimpleEmail(email, "Otp for SmartLocker",String.format("Your OTP for Smart Locker Sign UP %s ", otp.toString()));
        Cookie cookie=Generator.getOtpcookie(id);
        response.addCookie(cookie);
        return ResponseEntity.ok("generated successfully");
    }
    @GetMapping("/noauth/otp/verify/{otp}")
    public ResponseEntity<String> noAuthOTPVerify(@CookieValue(name = "otp", defaultValue = "noauth") String uuid ,@PathVariable Integer otp){
        if(!uuid.equals("noauth")){
            UUID id=UUID.fromString(uuid);
            if(otp == otPservice.getOTP(id).getOtp()) {
                otPservice.updateVerified(id);
                return ResponseEntity.ok().body("OTP Successfully verified");
            }
        }
        return  ResponseEntity.badRequest().body("your not authorized");
    }

}
