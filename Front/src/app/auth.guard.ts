import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Accès autorisé
    } else {
      // Rediriger vers la page de connexion si non authentifié
      this.router.navigate(['/connexion']);
      return false;
    }
  }

}

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirige vers le tableau de bord si déjà connecté
      return false;
    }
    return true; // Autorise l'accès à la page de connexion sinon
  }
}
