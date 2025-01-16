import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientsService {

  constructor(private httpClients: HttpClient) { }
  
  
  
  login(body:any) {
    return this.httpClients.post<any>("http://localhost:3000/api/auth/login", body)
  }
  
  getClients(){
    const token = localStorage.getItem("token")
    console.log(token)
  
    if(!token){
      throw new Error ('No authentification token found');
    }
  
    const headers = { Authorization : token}
    return this.httpClients.get<any>("http://localhost:3000/api/customers", {headers})
  }

    // Méthode pour ajouter un client dans le forulaire-client
    addClient(client: any): Observable<any> {
      const token = localStorage.getItem('token')||'';

        const headers = { Authorization: token };
     
      return this.httpClients.post<any>('http://localhost:3000/api/customers', client, { headers });
    }

    // Méthode pour modifier un client directement dans son emplacement//
    modifClient(id: string, client: any): Observable<any> {
      const token = localStorage.getItem('token') || '';
    
      const headers = { Authorization: token };
    
      return this.httpClients.put<any>(`http://localhost:3000/api/customers/${id}`, client, { headers });
    }

    getClientById(id: string): Observable<any> {
      return this.httpClients.get<any>(`http://localhost:3000/api/customers/${id}`);
    }
  
    deleteClient(clientId: string): Observable<any> {
      const token = localStorage.getItem('token') || '';
      const headers = { Authorization: token };
    
      return this.httpClients.delete<any>(
        `http://localhost:3000/api/customers/${clientId}`, 
        { headers }
      );
    }
  
  }