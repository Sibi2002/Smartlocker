package com.sibi.Smartlocker.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  user_id;
    @Column
    private  String  user_name;
    @Column
    private String password;
    @Column
    @Pattern(regexp = "/^\\d{10}$/")
    private Long phone_number;
    @Column
    @Pattern(regexp = "/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$/g")
    private String email;
    @Column
    private long locker_id;
}
