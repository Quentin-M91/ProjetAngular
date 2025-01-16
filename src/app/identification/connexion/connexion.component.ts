import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../personnalisation/footer/footer.component";
import { HttpLoginService } from "../http-login.service";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-connexion',
  imports: [FooterComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit{

  authData = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private httpLoginService: HttpLoginService, private router: Router) { }
  
  ngOnInit() {
    let authBody = {"username": "admin", "password": "pwd"}

    this.httpLoginService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);

      this.httpLoginService.getUser().subscribe(value => {
        console.log(value);
      })
    });

  }

  onSubmit() {
    this.httpLoginService.login(this.authData).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        localStorage.setItem('token', response.token); // Stocker le token
        this.router.navigate(['/accueil']); // Naviguer vers une autre page
      },
      error: (error) => {
        this.errorMessage = 'Erreur de connexion: ' + error.error?.message || 'Veuillez vérifier vos informations.';
        console.error(error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token'); // Supprime le token
    this.router.navigate(['/accueil']); // Redirige vers la page d'accueil
  }
}