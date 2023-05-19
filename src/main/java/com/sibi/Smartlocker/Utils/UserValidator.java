package com.sibi.Smartlocker.Utils;

import com.sibi.Smartlocker.Model.User;
import com.sibi.Smartlocker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserValidator {
    @Autowired
    private UserService userService;
     public Boolean validateUser(User user ){
        User authorized= userService.getUserForAccess(user.getUser_name());
        if(authorized!=null && user.getPassword().equals(authorized.getPassword())){
            return true;
        }
        return false;
     }
}
