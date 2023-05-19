package com.sibi.Smartlocker.Controller;
import com.sibi.Smartlocker.Dto.EmailDto;
import com.sibi.Smartlocker.Model.Locker;
import com.sibi.Smartlocker.Service.LockerService;
import com.sibi.Smartlocker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("locker")
@CrossOrigin(origins = "http://localhost:4000" , methods = {RequestMethod.POST,RequestMethod.GET})
public class LockerController {
    @Autowired
    UserService userService;
    @Autowired
    LockerService lockerService;
    @PostMapping ("/{id}/{macId}/{ip}")
    public ResponseEntity<EmailDto> getEmail(@PathVariable String macId, @PathVariable Long id, @PathVariable String ip){
        Locker locker=new Locker(id,macId,ip);
        lockerService.saveLocker(locker);
     if(userService.getEmail(macId)==null){
         return ResponseEntity.badRequest().build();
     }
      return ResponseEntity.ok().body(userService.getEmail(macId));
    }
    @GetMapping("/{macId}/{locker_id}")
    public ResponseEntity<String> macVerify(@PathVariable String macId,@PathVariable Long locker_id){
        if(lockerService.getLocker(macId)!=null && lockerService.getLocker(macId).getId()==locker_id){
            return ResponseEntity.status(200).body("found");
        }
        return ResponseEntity.status(405).body("not found");
    }
}
