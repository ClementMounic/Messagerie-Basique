package com.api.Messagerie.Basique.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.Messagerie.Basique.Entity.Chat;
import com.api.Messagerie.Basique.Entity.User;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByUsers(List<User> users);
    List<Chat> findByUsers_Id(Long userId);
}
