package com.sibi.Smartlocker;


import com.sibi.Smartlocker.Configuration.FirebaseInit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class SmartlockerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartlockerApplication.class, args);
		FirebaseInit.initialize();
	}

}
