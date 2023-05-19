package com.sibi.Smartlocker.Reposistory;

import com.sibi.Smartlocker.Dto.EmailDto;
import com.sibi.Smartlocker.Dto.UserDto;
import com.sibi.Smartlocker.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    @Query(value = "select * from users where user_name= ?1",nativeQuery = true)
    User getUserByName(String name);
    @Query(value = "select user_name, email from users join locker on users.locker_id=locker.id where mac_id= ?1 ",nativeQuery = true)
    EmailDto getEmail(String macId);
    @Modifying
    @Query(value = "update users set  phone_number=?2 where user_name=?1 ",nativeQuery = true)
    void updatePhone(String user_name,Long phone_number);
    @Modifying
    @Query(value = "update users set  email=?2 where user_name=?1 ",nativeQuery = true)
    void updateEmail(String user_name,String email);
}
