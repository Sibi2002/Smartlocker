package com.sibi.Smartlocker.Service;

import com.sibi.Smartlocker.Dto.EmailDto;
import com.sibi.Smartlocker.Model.User;
import com.sibi.Smartlocker.Reposistory.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepo userDao;
    public Boolean postUser(User user){
        if(userDao.getUserByName(user.getUser_name())!=null){
            return false;
        }
        userDao.save(user);
        return true;
    }
    public User getUserForAccess(String user_name){
        return userDao.getUserByName(user_name);
    }



    public Boolean updateMobileNum(String user_name,Long mobile_number){
        User user=userDao.getUserByName(user_name);
        user.setPhone_number(mobile_number);
        userDao.save(user);
        return true;
    }
    public EmailDto getEmail(String macId){
        return userDao.getEmail(macId);
    }
    public Boolean userAvailability(String userName){
        if(userDao.getUserByName(userName)==null){
            return true;
        }
        return false;
    }
    @Transactional
    public Boolean updatePhoneNUmber(String user_nmae,Long phone_number){
        userDao.updatePhone(user_nmae,phone_number);
        return true;
    }
    @Transactional
    public Boolean updateEmail(String user_nmae,String phone_number){
        userDao.updateEmail(user_nmae,phone_number);
        return true;
    }
}
