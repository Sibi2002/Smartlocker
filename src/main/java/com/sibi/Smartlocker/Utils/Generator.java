package com.sibi.Smartlocker.Utils;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.sibi.Smartlocker.Configuration.FirebaseInit;
import com.sibi.Smartlocker.Model.*;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;
import com.google.firebase.auth.FirebaseAuth;

import java.sql.Timestamp;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static jakarta.servlet.http.Cookie.*;

@Component
public class Generator {
    public Session getSessionManagement(User user){
        UUID uuid= UUID.randomUUID();
        Session sessionManagement=new Session();
        sessionManagement.setId(uuid);
        sessionManagement.setUser_id(user.getUser_id());
        return sessionManagement;
    }
    public Cookie getCookie(Session sessionManagement){
        String id=sessionManagement.getId().toString();
        Cookie cookie = new Cookie("username",id);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        return cookie;
    }
    public static Integer generateOTP(){
        return (int)(Math.random()*1000000);
    }
    public static OTP saveOTP(UUID id, int otp){
        OTP Otp=new OTP(id,otp,false,new Timestamp(System.currentTimeMillis()));
        return Otp;
    }
    public static Cookie getOtpcookie(UUID id){
        Cookie cookie= new Cookie("otp",id.toString());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        return cookie;
    }
    public static boolean authorizeUser(String idToken) {
        try {

            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            return true; // User is authorized
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false; // Authorization failed
    }

}
