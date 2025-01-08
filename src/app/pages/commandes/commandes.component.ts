import { Component } from '@angular/core';
import { HttpOrdersService } from '../../service/http-orders.service';
import { FooterComponent } from '../../personnalisation/footer/footer.component';

@Component({
  selector: 'app-commandes',
  imports: [FooterComponent],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})
export class CommandesComponent {

  constructor(private commandeService: HttpOrdersService) { }

  ngOnInit(): void {

    let authBody = {"username": "admin", "password": "pwd"}

    this.commandeService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);

    this.commandeService.getProducts().subscribe(value => {
        console.log(value); 
      },

    );
  });
  }
}
