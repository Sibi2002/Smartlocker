package com.sibi.Smartlocker.Service;

import com.sibi.Smartlocker.Model.OTP;
import com.sibi.Smartlocker.Reposistory.OTPrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OTPservice {
    @Autowired
    OTPrepo OTPrepo;
    public void save(OTP otp){
        OTPrepo.save(otp);
    }

    public OTP getOTP(UUID id){
      return  OTPrepo.getOTPByid(id);
    }
    public void deleteOTP(UUID id){
        OTPrepo.deleteById(id);
    }
    public void updateVerified(UUID id){
        OTP otp=OTPrepo.getReferenceById(id);
        otp.set_verified(true);
        OTPrepo.save(otp);
    }
}
