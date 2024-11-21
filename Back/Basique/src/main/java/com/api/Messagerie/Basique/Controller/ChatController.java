package com.api.Messagerie.Basique.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.api.Messagerie.Basique.Entity.Chat;
import com.api.Messagerie.Basique.Entity.Message;
import com.api.Messagerie.Basique.Entity.User;
import com.api.Messagerie.Basique.Service.ChatService;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

 

    @PostMapping("/{chatId}/messages")
    public Message sendMessage(@PathVariable Long chatId, @RequestParam Long senderId, @RequestBody String content) {
        Chat chat = chatService.getChatById(chatId);

        User sender = new User(); // À remplacer par la récupération depuis la base
        sender.setId(senderId);

        return chatService.sendMessage(chat, sender, content);
    }

    @GetMapping("/{chatId}")
    public Chat getChat(@PathVariable Long chatId) {
        return chatService.getChatById(chatId);
    }
    
    @GetMapping("/user/{userId}")
    public List<Chat> getChatsByUserId(@PathVariable Long userId) {
        return chatService.getChatsByUserId(userId);
    }

}
