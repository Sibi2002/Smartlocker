package com.sibi.Smartlocker.Reposistory;

import com.sibi.Smartlocker.Dto.UserDto;
import com.sibi.Smartlocker.Model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SessionRepo extends JpaRepository<Session, UUID> {

    @Query(value = "select user_name,email,phone_number,locker.ip_address,is_verified,locker_id from session_management join users on users.user_id=session_management.user_id join locker on users.locker_id=locker.id where  session_management.id= ?1",nativeQuery = true)
    UserDto getUserByUser_id(UUID id);

}
