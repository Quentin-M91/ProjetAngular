import { Component } from '@angular/core';
import { FooterComponent } from "../../personnalisation/footer/footer.component";
import { HttpLoginService } from "../http-login.service";


@Component({
  selector: 'app-connexion',
  imports: [FooterComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

  constructor(private httpLoginService: HttpLoginService) { }

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
}