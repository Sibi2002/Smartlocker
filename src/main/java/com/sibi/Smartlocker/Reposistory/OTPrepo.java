package com.sibi.Smartlocker.Reposistory;


import com.sibi.Smartlocker.Model.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface OTPrepo extends JpaRepository<OTP, UUID> {

    @Query(value = "select * from otp_management where id= ?1",nativeQuery = true)
    OTP getOTPByid (UUID id);

}
