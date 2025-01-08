import { Component } from '@angular/core';
import { HeaderComponent } from "../personnalisation/header/header.component";
import { FooterComponent } from "../personnalisation/footer/footer.component";

@Component({
  selector: 'app-accueil',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
