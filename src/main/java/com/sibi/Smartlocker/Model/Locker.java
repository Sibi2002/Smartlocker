package com.sibi.Smartlocker.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "locker")
public class Locker {
    @Id
    private Long id;
    @Column
    private String mac_id;
    private String ip_address;
}
