import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/chats'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  getChats(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

    getUser(userId: number): Observable<any> {
        return this.http.get<any>(`http://localhost:5000/users/${userId}`);
    }

    searchUsers(query: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:5000/users/search?query=${query}`);
      }
      
      createChat(user1_id:number,user2_id: number): Observable<any> {
        return this.http.post(`${this.apiUrl}`, { user1_id,user2_id });
      }

      getMessages(chatId: number): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:5000/messages?chatId=${chatId}`);
      }
    
      sendMessage(chat_id:number,sender_id:number,content:string): Observable<any> {
        return this.http.post<any>(`http://localhost:5000/messages`, {chat_id,sender_id,content});
      }
      
}
