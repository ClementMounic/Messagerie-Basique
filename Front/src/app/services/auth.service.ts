import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlLogin = 'http://localhost:8080/users/exists';
  private apiUrlRegister = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.apiUrlLogin}?username=${username}&password=${password}`;
    return this.http.get<void>(url, { observe: 'response' }).pipe(
      map((response) => {
        // Si le statut HTTP est 200, l'utilisateur existe
        const isLoggedIn = response.status === 200;
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        return isLoggedIn;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('Utilisateur ou mot de passe incorrect');
          localStorage.setItem('isLoggedIn', JSON.stringify(false));
          return throwError(() => new Error('Utilisateur ou mot de passe incorrect'));
        } else {
          console.error('Erreur lors de la connexion', error);
          return throwError(() => new Error('Erreur lors de la connexion. Veuillez réessayer.'));
        }
      })
    );
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
  }

  isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }

  register(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post<any>(this.apiUrlRegister, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'inscription', error);
        let errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        if (error.status === 400) {
          errorMessage = 'Données invalides. Veuillez vérifier vos informations.';
        } else if (error.status === 409) {
          errorMessage = 'Ce nom d\'utilisateur est déjà utilisé.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
