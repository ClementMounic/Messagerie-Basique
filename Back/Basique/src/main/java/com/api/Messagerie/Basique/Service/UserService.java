package com.api.Messagerie.Basique.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.Messagerie.Basique.Entity.User;
import com.api.Messagerie.Basique.Repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
    public boolean doesUserExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
	
    public User addUser(User user) {
    	
        return userRepository.save(user);
    }
    
    public boolean doesUserExist(String username, String password) {
        Optional<User> user = userRepository.findByUsernameAndPassword(username, password);
        return user.isPresent(); 
    }
	

}
