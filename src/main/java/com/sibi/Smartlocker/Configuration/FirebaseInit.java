package com.sibi.Smartlocker.Configuration;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;


import java.io.FileInputStream;
import java.io.IOException;


public class FirebaseInit {
    public static void initialize() {
        try {
            String currentDirectory = System.getProperty("user.dir");
//            FileInputStream serviceAccount = new FileInputStream(currentDirectory +"/resources/FirebaseAuth/authentication-b1d0f-firebase-adminsdk-k2roj-01391084f5.json");
            FileInputStream serviceAccount = new FileInputStream("/home/sibichakkaravarthy/Downloads/Smartlocker/src/main/resources/FirebaseAuth/authentication-b1d0f-firebase-adminsdk-k2roj-01391084f5.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
