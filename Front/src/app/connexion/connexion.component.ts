import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'], // Correction de `styleUrl` en `styleUrls`
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Message d'erreur pour l'UI

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
  
    this.authService.login(this.email, this.password).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/']); // Redirige vers la page principale
          
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la connexion', err);
        this.errorMessage =
          err.message === 'Utilisateur ou mot de passe incorrect'
            ? err.message
            : 'Erreur lors de la connexion. Veuillez réessayer.';
      },
    });
  }
}
