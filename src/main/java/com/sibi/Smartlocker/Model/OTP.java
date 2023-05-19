package com.sibi.Smartlocker.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "otp_management")
public class OTP {
    @Id
    UUID id;
    int otp;
    boolean is_verified;
    Timestamp created_on;
}
