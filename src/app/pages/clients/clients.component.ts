import { Component } from '@angular/core';
import { FooterComponent } from "../../personnalisation/footer/footer.component";
import { HttpClientsService } from '../../service/http-clients.service';

@Component({
  selector: 'app-clients',
  imports: [FooterComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  constructor(private produitsService: HttpClientsService) { }

  ngOnInit(): void {

    let authBody = {"username": "admin", "password": "pwd"}

    this.produitsService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);

    this.produitsService.getProducts().subscribe(value => {
        console.log(value); 
      },

    );
  });
  }
}
