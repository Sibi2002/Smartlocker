package com.sibi.Smartlocker.Controller;

import com.sibi.Smartlocker.Exception.*;
import com.sibi.Smartlocker.Model.OTP;
import com.sibi.Smartlocker.Model.Session;
import com.sibi.Smartlocker.Model.User;
import com.sibi.Smartlocker.Service.*;
import com.sibi.Smartlocker.Utils.Generator;
import com.sibi.Smartlocker.Utils.UserValidator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4000" ,allowCredentials = "true",methods = {RequestMethod.POST,RequestMethod.GET})
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private Generator generator;
    @Autowired
    private UserValidator validator;
    @Autowired
    private SessionService sessionRepository;
    @Autowired
    private OTPservice otPservice;
    @Autowired
    private LockerService lockerService;
    @PostMapping("/login")
    public ResponseEntity<String> getUserForAccess(@RequestBody User user, HttpServletResponse httpServletResponse){
        if (!validator.validateUser(user)) {
            throw  new MissMatch("Login failed");
        }
            Session sessionManagement = generator.getSessionManagement(userService.getUserForAccess(user.getUser_name()));
            sessionRepository.save(sessionManagement);
            Cookie cookie = generator.getCookie(sessionManagement);
            httpServletResponse.addCookie(cookie);
            String LogIn = "Login Successful";
            return ResponseEntity.ok().body(LogIn);

    }
    @PostMapping("/signup")
    public ResponseEntity <String> postUser(@RequestBody User user, @CookieValue(name = "otp", defaultValue = "noauth") String uuid, HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        if(uuid.equals("noauth")&& authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            UUID id = UUID.fromString(uuid);
            OTP otp = otPservice.getOTP(id);
            String token = authorizationHeader.substring(7);
                if (otp != null && otp.is_verified() && Generator.authorizeUser(token)){
                    Boolean access = userService.postUser(user);
                    String Signup = "SignUp Successful";
                    otPservice.deleteOTP(id);
                    return ResponseEntity.ok().body(Signup);
                }
        }
            return ResponseEntity.status(403).body("Not Authorized");
    }
    @PostMapping("/email/{email}/{user_name}")
    public ResponseEntity <String> updateEmail(@PathVariable  String email , @CookieValue(name = "username", defaultValue = "noauth") String uuid, @PathVariable String user_name){

        if(!uuid.equals("noauth")) {
            UUID id = UUID.fromString(uuid);
            OTP otp = otPservice.getOTP(id);
            System.out.println(otp.is_verified());
            if (otp != null && otp.is_verified()) {
                boolean status = userService.updateEmail(user_name, email);
                otPservice.deleteOTP(id);
                if (!status) {
                    throw new AlreadyExist("change failed");
                }
                return ResponseEntity.ok().body("Successfully Changed");
            }
        }
            return ResponseEntity.status(401).body("not authorized");
    }
    @PostMapping("/mobile_number/{phone_number}/{user_name}")
    public ResponseEntity <String> updateMobileNum(@PathVariable @Pattern(regexp = "/^\\d{10}$/",message = "not valid mobile number") long phone_number, @PathVariable String user_name,HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if(  authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            if(Generator.authorizeUser(token)){
            boolean status = userService.updatePhoneNUmber(user_name, phone_number);
            if (!status) {
                throw new AlreadyExist("Change failed");

            }
            return ResponseEntity.ok().body("Successfully Changed");
            }

        }
        return ResponseEntity.status(401).body("not authorized");
    }
    @PostMapping("/user_availability")
    public ResponseEntity<String> userAvailability(@RequestBody User user){
        if(userService.userAvailability(user.getUser_name()))
        {
            return ResponseEntity.ok().body(lockerService.getLockerIp(user.getLocker_id()));
        }
       return ResponseEntity.ok().body("Not available");
    }
}
