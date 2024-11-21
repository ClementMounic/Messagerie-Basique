
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/ChatService';
import { UserService } from '../services/UserService';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  users: any[] = [];  // Liste des utilisateurs
  chats: any[] = [];  // Liste des chats
  selectedChat: any = null;  // Chat sélectionné
  message: string = '';  // Contenu du message
  currentUser: any = { id: 1, username: 'User1' };  // L'utilisateur courant

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer tous les utilisateurs
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    
  }

  // Créer ou obtenir un chat avec un utilisateur spécifique
  createChat(user: any): void {
    this.chatService.createOrGetChat(this.currentUser.id, user.id).subscribe((chat) => {
      this.selectedChat = chat;
      this.loadMessages(chat.id);  // Charger les messages pour ce chat
    });
  }

  // Sélectionner un chat existant
  selectChat(chat: any): void {
    this.selectedChat = chat;
    this.loadMessages(chat.id);
  }

  // Charger les messages pour un chat donné
  loadMessages(chatId: number): void {
    this.chatService.getChat(chatId).subscribe((chat) => {
      this.selectedChat = chat;
    });
  }

  // Envoyer un message
  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.selectedChat.id, this.currentUser.id, this.message).subscribe((message) => {
        this.selectedChat.messages.push(message);  // Ajouter le message dans la conversation
        this.message = '';  // Réinitialiser la zone de saisie
      });
    }
  }

  logout(){
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    this.router.navigate(['/connexion']); 
  }
}

