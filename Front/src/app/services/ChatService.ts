import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/chats'; // URL de votre backend

  constructor(private http: HttpClient) {}

  // Créer ou obtenir une conversation entre deux utilisateurs
  createOrGetChat(userOneId: number, userTwoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create?userOneId=${userOneId}&userTwoId=${userTwoId}`, {});
  }

  // Récupérer une conversation par son ID
  getChat(chatId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${chatId}`);
  }

  // Envoyer un message dans une conversation
  sendMessage(chatId: number, senderId: number, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${chatId}/messages?senderId=${senderId}`, content);
  }
}
