package com.api.Messagerie.Basique.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.Messagerie.Basique.Entity.Chat;
import com.api.Messagerie.Basique.Entity.Message;
import com.api.Messagerie.Basique.Entity.User;
import com.api.Messagerie.Basique.Repository.ChatRepository;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

 


    public Message sendMessage(Chat chat, User sender, String content) {
        Message message = new Message(sender, content);
        chat.getMessages().add(message);
        chatRepository.save(chat); // Sauvegarder le chat avec le nouveau message
        return message;
    }

    public Chat getChatById(Long chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat non trouvé"));
    }
    
    // Récupérer tous les chats d'un utilisateur
    public List<Chat> getChatsByUserId(Long userId) {
        return chatRepository.findByUsers_Id(userId);
    }
}
