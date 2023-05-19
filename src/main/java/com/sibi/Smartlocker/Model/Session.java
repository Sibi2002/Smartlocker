package com.sibi.Smartlocker.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "session_management")
public class Session {
    @Id
    private UUID id;
    private int user_id;
    boolean is_verified;
}
