import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpProduitsService {

  constructor(private httpProduits: HttpClient) { }

  login(body: any) {
    return this.httpProduits.post<any>("http://localhost:3000/api/auth/login", body)
  }

  getProducts() {
    const token = localStorage.getItem("token")
    console.log(token)

    if (!token) {
      throw new Error('No authentification token found');
    }

    const headers = { Authorization: token }
    return this.httpProduits.get<any>("http://localhost:3000/api/products", { headers })
  }
}
