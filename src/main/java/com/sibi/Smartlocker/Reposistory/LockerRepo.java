package com.sibi.Smartlocker.Reposistory;

import com.sibi.Smartlocker.Model.Locker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface LockerRepo extends JpaRepository<Locker,Long> {

    @Query(value = "select * from locker where mac_id= ?1",nativeQuery = true)
    Locker getLockerById(String id);
}
