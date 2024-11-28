import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/ChatService';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listchat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
})
export class ListChat implements OnInit {
  @Input() userId!: number; // L'ID de l'utilisateur peut être passé comme input
  chats: any[] = [];
  searchTerm: string = ''; // Terme de recherche
  filteredUsers: any[] = []; // Résultats de la recherche
  selectedUser: any | null = null; // Utilisateur sélectionné

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (this.userId) {
      this.loadChats(this.userId);
    }
  }

  loadChats(userId: number): void {
    this.chatService.getChats(userId).subscribe(
      (data) => {
        // Parcours les chats pour identifier l'utilisateur partenaire
        const processedChats = data.map((chat) => {
          const partnerId = chat.user1_id == userId ? chat.user2_id : chat.user1_id;
  
          // Récupère l'utilisateur partenaire et ajoute son nom au chat
          return this.chatService.getUser(partnerId).pipe(
            map((user) => ({ ...chat, partnerName: user.username })),
            catchError((error) => {
              console.error(`Error loading user ${partnerId}:`, error);
              return of({ ...chat, partnerName: 'Unknown' }); // En cas d'erreur, nom inconnu
            })
          );
        });
  
        // Attends que tous les appels soient terminés avant d'affecter à `this.chats`
        forkJoin(processedChats).subscribe(
          (chatsWithNames) => (this.chats = chatsWithNames),
          (error) => console.error('Error processing chats:', error)
        );
      },
      (error) => console.error('Error loading chats:', error)
    );
  }
  

  onChatSelect(chat: any): void {
    console.log('Selected chat:', chat);
    this.router.navigate(['/chat', chat.id ],{relativeTo: this.route});
    // Vous pouvez naviguer ou effectuer une action spécifique
  }

  onSearch(): void {
    if (this.searchTerm.trim().length > 0) {
      this.chatService.searchUsers(this.searchTerm).subscribe(
        (users) => (this.filteredUsers = users),
        (error) => console.error('Error searching users:', error)
      );
    } else {
      this.filteredUsers = [];
    }
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.filteredUsers = []; // Masque les suggestions après sélection
  }

  createChat(): void {
    if (this.selectedUser) {
      this.chatService.createChat(this.userId,this.selectedUser.id).subscribe(
        (chat) => {
          console.log('Chat created successfully:', chat);
          this.selectedUser = null; // Réinitialise l'utilisateur sélectionné
          this.searchTerm = ''; // Vide le champ de recherche
          this.loadChats(this.userId); // Recharge la liste des chats
        },
        (error) => console.error('Error creating chat:', error)
      );
    }
  }
}





