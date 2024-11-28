import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/ChatService'; // Assure-toi que ce service est configuré
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class ChatComponent implements OnInit {
  user_id!: number; // ID de l'utilisateur actuel
  chatId!: number; // Chat ID passé en paramètre (peut être un Input ou via route)
  username: string = ''; // Nom de l'utilisateur actuel
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = +params['id']; // Convertir en nombre
      this.user_id = localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId') || '{}') : 0;
      this.chatService.getUser(this.user_id).subscribe((data) => {
        this.username = data.username;
      });
      this.loadMessages(); // Charger les messages pour ce chat
    });
    }

  loadMessages(): void {
    this.chatService.getMessages(this.chatId).subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => console.error('Error loading messages:', error)
    );
  }

  sendMessage(): void {
    if (this.newMessage) {
      this.chatService.sendMessage(this.chatId,this.user_id,this.newMessage).subscribe(
        () => {
          this.messages.push({
            username: this.username, // Remplace par le nom de l'utilisateur actuel
            content: this.newMessage,
            timestamp: new Date().toISOString(),
            sender_id: this.user_id,
          });
          this.newMessage = ''; // Réinitialiser le champ de saisie
        },
        (error) => console.error('Error sending message:', error)
      );
    }
  }
}
