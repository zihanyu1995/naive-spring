package com.yzh.myspring.services;

import com.yzh.myspring.models.User;
import com.yzh.myspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserService {
    @Autowired
    UserRepository repository;

    @GetMapping("api/user")
    public List<User> findAllUsers(){
         return (List<User>) repository.findAll();
    }

    @GetMapping("api/user/{userId}")
    public User findUserById(@PathVariable("userId") int id){
        Optional<User> res =  repository.findById(id);
        if(res.isPresent())
            return res.get();
        return null;
    }

    @PostMapping("api/user")
    public User creatUser(@RequestBody User user){
        return repository.save(user);
    }

    @DeleteMapping("api/user/{userId}")
    public void deleteUser(@PathVariable("userId") int id){
        repository.deleteById(id);
    }

    @PutMapping("api/user/{userId}")
    public User updateUserById(@PathVariable("userId") int id, @RequestBody User newUser){
        Optional<User> res =  repository.findById(id);
        if(res.isPresent()){
            User user = res.get();
            user.setFirstName(newUser.getFirstName());
            user.setJob(newUser.getJob());
            user.setLastName(newUser.getLastName());
            user.setUsername(newUser.getUsername());
            repository.save(user);
            return user;
        }
        return null;
    }
}
