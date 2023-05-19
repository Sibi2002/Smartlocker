package com.sibi.Smartlocker.Controller;

import com.sibi.Smartlocker.Dto.UserDto;
import com.sibi.Smartlocker.Exception.NotFound;
import com.sibi.Smartlocker.Service.OTPservice;
import com.sibi.Smartlocker.Utils.Generator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sibi.Smartlocker.Service.SessionService;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4000" , allowCredentials = "true", methods = {RequestMethod.POST,RequestMethod.GET})
public class SessionController {
    @Autowired
    private SessionService service;
    @Autowired
    private OTPservice otPservice;
    @GetMapping("/api/deletesession")
    public  void delete(@CookieValue(name = "username",defaultValue = "noauth") String uuid, HttpServletResponse response ) {
        if (!uuid.equals("noauth")){
            UUID id = UUID.fromString(uuid);
            Cookie ck=new Cookie("username","noauth");
            ck.setPath("/");
            ck.setMaxAge(0);
            response.addCookie(ck);
            service.deleteById(id);
        }
    }
    @GetMapping("/api/verify")
    public UserDto verifyAuth(@CookieValue(name = "username", defaultValue = "noauth") String uuid){
        if(!uuid.equals("noauth")){
            UUID id=UUID.fromString(uuid);
            UserDto authorized=service.getAuth(id);
            if(authorized==null){
                throw new NotFound("Invalid Session");
            }
            return authorized;
        }
        throw new NotFound("Invalid Session");
    }
    @GetMapping("/api/isverified")
    public ResponseEntity<String>  updateVerified(@CookieValue(name = "username", defaultValue = "noauth") String uuid, HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        if(!uuid.equals("noauth")){
            UUID id=UUID.fromString(uuid);
            if(  authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
                String token = authorizationHeader.substring(7);
                if(Generator.authorizeUser(token)){
                    service.updateVerified(id);
                    return ResponseEntity.ok("Successfully changed");
                }
            } else if (otPservice.getOTP(id)!=null && otPservice.getOTP(id).is_verified()) {
                service.updateVerified(id);
                otPservice.deleteOTP(id);
                return ResponseEntity.ok("Successfully changed");
            }
        }
        return   ResponseEntity.badRequest().body("not authorized");
    }
}
