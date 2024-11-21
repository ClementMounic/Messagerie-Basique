import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule,],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Message d'erreur


  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Soumet les données pour inscrire un nouvel utilisateur.
   */
  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.router.navigate(['/connexion']); // Redirige après 3 secondes
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'inscription', err);
        this.errorMessage = err.message;
      },
    });
  }
}
