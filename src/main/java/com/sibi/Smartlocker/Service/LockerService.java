package com.sibi.Smartlocker.Service;

import com.sibi.Smartlocker.Model.Locker;
import com.sibi.Smartlocker.Reposistory.LockerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LockerService {
    @Autowired
    LockerRepo lockerRepo;
    public void saveLocker(Locker locker){
        lockerRepo.save(locker);
    }
    public String getLockerIp(Long id){
        return lockerRepo.getReferenceById(id).getIp_address();
    }

    public Locker getLocker(String macId){
        return  lockerRepo.getLockerById(macId);
    }
}
