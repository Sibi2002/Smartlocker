package com.sibi.Smartlocker.Service;

import com.sibi.Smartlocker.Dto.UserDto;
import com.sibi.Smartlocker.Model.Session;
import com.sibi.Smartlocker.Reposistory.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SessionService {
    @Autowired
    private SessionRepo sessionRepository;
    public void save(Session sessionManagement){
        sessionRepository.save(sessionManagement);
    }
    public UserDto getAuth(UUID id){
        return  sessionRepository.getUserByUser_id(id);
    }
    public void deleteById(UUID id){
        sessionRepository.deleteById(id);
    }
    public void updateVerified(UUID id){
       Session session= sessionRepository.getReferenceById(id);
       session.set_verified(true);
       sessionRepository.save(session);
    }
}
