import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../personnalisation/footer/footer.component";
import { HttpClientsService } from '../../service/http-clients.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true, // Si vous utilisez un composant autonome
  imports: [FooterComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: any[] = []; // Liste complète des clients
  filteredClients: any[] = []; // Liste filtrée pour l'affichage
  errorMessage: string = ''; // Gestion des messages d'erreur
  searchQuery: string = ''; // Requête de recherche
  editMode: { [key: string]: boolean } = {}; // Suivi des modes édition par client

  constructor(private clientService: HttpClientsService, private router: Router) {}

  ngOnInit(): void {
    this.authenticateAndLoadClients();
  }

  /**
   * Authentifie l'utilisateur et charge les clients.
   */
  private authenticateAndLoadClients(): void {
    const authBody = { username: 'admin', password: 'pwd' };

    this.clientService.login(authBody).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.loadClients();
      },
      error: (error) => {
        this.errorMessage = `Erreur de connexion : ${error.message}`;
      },
    });
  }

  /**
   * Charge les clients après authentification.
   */
  private loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (clientsData) => {
        this.clients = clientsData;
        this.filteredClients = [...clientsData]; // Initialisation de la liste filtrée
      },
      error: (error) => {
        this.errorMessage = `Erreur lors du chargement des clients : ${error.message}`;
      },
    });
  }

  /**
   * Filtre les clients selon la requête de recherche.
   */
  filterClients(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(query)
    );
  }

  /**
   * Active le mode édition pour un client donné.
   */
  enableEdit(clientId: string): void {
    this.editMode[clientId] = true;
  }

  /**
   * Redirige vers la page de modification d'un client.
   */
  navigateToEdit(clientId: string): void {
    this.router.navigate([`/modification-client/${clientId}`]);
  }

  /**
   * Confirme et supprime un client.
   */
  confirmDelete(clientId: string): void {
    const confirmation = window.confirm(
      'Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.'
    );

    if (confirmation) {
      this.deleteClient(clientId);
    }
  }

  /**
   * Supprime un client donné.
   */
  deleteClient(clientId: string): void {
    this.clientService.deleteClient(clientId).subscribe({
      next: () => {
        this.clients = this.clients.filter((client) => client.id !== clientId);
         this.clients = this.clients.map((client, index) => ({
          ...client,
          id: index + 1, // Recalcule l'ID en fonction de la position
        }));
        this.filteredClients = [...this.clients]; // Mise à jour de la liste filtrée
        alert('Client supprimé avec succès.');
      },
      error: (error) => {
        alert(`Erreur lors de la suppression du client : ${error.message}`);
      },
    });
  }

  

  /**
   * Sauvegarde les modifications apportées à un client.
   */
  modifClient(client: any): void {
    this.clientService.modifClient(client.id, client).subscribe({
      next: (updatedClient) => {
        const index = this.clients.findIndex((c) => c.id == client.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
          this.filteredClients = [...this.clients];
        }
        alert('Client modifié avec succès.');
      },
      error: (error) => {
        alert(`Erreur lors de la modification du client : ${error.message}`);
      },
    });
  }
}
