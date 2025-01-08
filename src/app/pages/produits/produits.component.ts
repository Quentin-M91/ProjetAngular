import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../personnalisation/footer/footer.component';
import { HttpProduitsService } from '../../service/http-produits.service';

@Component({
  selector: 'app-produits',
  imports: [FooterComponent],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit {

  produits: any[] = []; 

  constructor(private produitsService: HttpProduitsService) { }

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
