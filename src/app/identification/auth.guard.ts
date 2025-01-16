import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Vérifie si un token existe
    if (!token) {
      this.router.navigate(['/connexion']); // Redirige vers la page de connexion si non authentifié
      return false;
    }
    return true;
  }
}
