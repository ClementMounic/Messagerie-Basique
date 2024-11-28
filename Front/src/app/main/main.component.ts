
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ListChat } from '../list-chat/list-chat.component';
import { ChatService } from '../services/ChatService';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [ListChat,RouterOutlet],
  standalone: true,
})
export class MainComponent implements OnInit {

  userId!: number;
  username!:string;


  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {

    this.userId = localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId') || '{}') : 0;

    console.log('userId', this.userId);

    this.chatService.getUser(this.userId).subscribe((data) => {
      this.username = data.username;
    });

    
  }


  logout(){
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    this.router.navigate(['/connexion']); 
  }
}

