import { Component } from '@angular/core';
import { FooterComponent } from "../personnalisation/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [FooterComponent, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  isLoggedIn = !!localStorage.getItem('token');

  constructor(private router: Router) {}

  // Action pour gérer connexion/déconnexion
  handleAuthAction() {
    if (this.isLoggedIn) {
      // Déconnexion
      localStorage.removeItem('token'); // Supprime le token
      this.isLoggedIn = false;
      this.router.navigate(['/accueil']); // Redirige vers la page d'accueil
      console.log('Vous êtes déconnecté');
    } else {
      // Connexion
      this.router.navigate(['/connection']); // Redirige vers la page de connexion
    }
  }
}