import { Component, OnInit } from '@angular/core';
import { HttpOrdersService } from '../../service/http-orders.service';
import { FooterComponent } from '../../personnalisation/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commandes',
  imports: [FooterComponent, CommonModule, FormsModule],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})

export class CommandesComponent implements OnInit {
  orders: any[] = []; // Liste des commandes
  isFormVisible = false; // Afficher ou cacher le formulaire
  isEdit = false; // Mode édition ou création
  errorMessage: string = ''; // Gestion des messages d'erreur
  orderForm: any = { productId: null, quantity: null, clientId: null }; // Modèle de formulaire

  constructor(private orderService: HttpOrdersService) { }

  ngOnInit(): void {
    this.authenticateAndLoadClients();
  }

  /**
   * Authentifie l'utilisateur et charge les commande.
   */
  private authenticateAndLoadClients(): void {
    const authBody = { username: 'admin', password: 'pwd' };

    this.orderService.login(authBody).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.loadOrders();
      },
      error: (error) => {
        this.errorMessage = `Erreur de connexion : ${error.message}`;
      },
    });
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    );
  }
  
  // loadOrders(): void {
  //   this.orderService.getOrders().subscribe(
  //     (data) => {
  //       this.orders = data;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des commandes :', error);
  //     }
  //   );
  // }

  // Afficher le formulaire pour une nouvelle commande
  showForm(): void {
    this.isFormVisible = true;
    this.isEdit = false;
    this.orderForm = { productId: null, quantity: null, clientId: null };
  }

  // Remplir le formulaire pour modifier une commande existante
  editOrder(order: any): void {
    this.isFormVisible = true;
    this.isEdit = true;
    this.orderForm = { ...order };
  }

  // Soumettre le formulaire (création ou modification)
  submitForm(): void {
    if (this.isEdit) {
      this.orderService.updateOrder(this.orderForm.id, this.orderForm).subscribe(() => {
        this.loadOrders();
        this.isFormVisible = false;
      });
    } else {
      this.orderService.createOrder(this.orderForm).subscribe(() => {
        this.loadOrders();
        this.isFormVisible = false;
      });
    }
  }

  // Supprimer une commande
  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  // Annuler l’action (revenir à la liste)
  cancelForm(): void {
    this.isFormVisible = false;
  }
}