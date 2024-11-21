package com.api.Messagerie.Basique.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.Messagerie.Basique.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
	Optional<User> findByUsernameAndPassword(String username, String password);
    Optional<User> findByUsername(String username);
}
