import { Component } from '@angular/core';
import { FooterComponent } from "../../personnalisation/footer/footer.component";
import { HttpUsersService } from '../../service/http-users.service';

@Component({
  selector: 'app-utilisateurs',
  imports: [FooterComponent],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {
  constructor(private usersService: HttpUsersService) { }

  ngOnInit(): void {

    let authBody = {"username": "admin", "password": "pwd"}

    this.usersService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);

    this.usersService.getProducts().subscribe(value => {
        console.log(value); 
      },

    );
  });
  }
}
