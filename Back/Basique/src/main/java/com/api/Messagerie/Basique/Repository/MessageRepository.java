package com.api.Messagerie.Basique.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.Messagerie.Basique.Entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {}
