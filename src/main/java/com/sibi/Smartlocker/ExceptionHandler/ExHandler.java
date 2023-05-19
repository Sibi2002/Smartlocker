package com.sibi.Smartlocker.ExceptionHandler;

import com.sibi.Smartlocker.Exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.rmi.AlreadyBoundException;


@ControllerAdvice
public class ExHandler {
    @ExceptionHandler(NotFound.class)
    public ResponseEntity<Object> HandleNOtFound(Exception ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(AlreadyBoundException.class)
    public  ResponseEntity<Object> HandleAlreadyExist(Exception ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    }
    @ExceptionHandler(MissMatch.class)
    public ResponseEntity<Object> HandleMissMatch(Exception ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> HandleException(Exception ex){
        System.out.println(ex.toString());
        return  new ResponseEntity<>(ex.getMessage()+" You messed up big time",HttpStatus.BAD_GATEWAY);
    }

}
