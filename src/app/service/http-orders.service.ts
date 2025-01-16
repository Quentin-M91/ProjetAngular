import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpOrdersService {
  private baseUrl = 'http://localhost:3000/api/orders';

  constructor(private httpCommande: HttpClient) { }

  login(body: any) {
    return this.httpCommande.post<any>("http://localhost:3000/api/auth/login", body)
  }

  getOrders(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token utilisé pour l\'authentification :', token);

    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log('URL de l\'API :', `http://localhost:3000/api/orders`);
    return this.httpCommande.get(`http://localhost:3000/api/orders`, { headers });
  }


  // Récupérer une commande par ID
  getOrderById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpCommande.get<any>(`http://localhost:3000/api/orders`, { headers });
  }

  // Ajouter une nouvelle commande
  createOrder(order: { productId: number; quantity: number; clientId: number }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpCommande.post<any>(this.baseUrl, order, { headers });
  }

  // Modifier une commande existante
  updateOrder(id: number, order: { productId: number; quantity: number; clientId: number }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpCommande.put<any>(`${this.baseUrl}/${id}`, order, { headers });
  }

  // Supprimer une commande
  deleteOrder(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpCommande.delete<any>(`${this.baseUrl}/${id}`,  { headers });
  }
}
