import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',  // Indique que ce service est fourni dans l'ensemble de l'application
})
export class HttpProduitsService {
  private apiUrl = 'http://localhost:3000/api';  // URL de base de l'API

  constructor(private httpProduits: HttpClient) {}  // Injection du service HttpClient

  // Fonction pour authentifier un utilisateur et obtenir un token
  login(body: any) {
    return this.httpProduits.post<any>(`${this.apiUrl}/auth/login`, body);  // Envoie une requête POST pour se connecter
  }

  // Fonction pour récupérer tous les produits
  getProducts() {
    const token = localStorage.getItem('token');  // Récupère le token d'authentification dans le stockage local
    if (!token) {
      throw new Error('No authentication token found');  // Si aucun token n'est trouvé, une erreur est lancée
    }
    const headers = { Authorization: token };  // Ajoute le token dans les en-têtes de la requête
    return this.httpProduits.get<any>(`${this.apiUrl}/products`, { headers });  // Envoie une requête GET pour obtenir les produits
  }

  // Fonction pour récupérer un produit spécifique par son ID
  getProductById(id: number) {
    const token = localStorage.getItem('token');  // Récupère le token d'authentification
    const headers = { Authorization: token || '' };  // Utilise le token pour l'authentification, sinon une chaîne vide
    return this.httpProduits.get<any>(`${this.apiUrl}/products/${id}`, { headers });  // Envoie une requête GET pour obtenir un produit par ID
  }

  // Fonction pour ajouter un nouveau produit
  addProduct(product: any) {
    const token = localStorage.getItem('token');  // Récupère le token
    const headers = { Authorization: token || '' };  // Ajoute le token dans les en-têtes de la requête
    return this.httpProduits.post(`${this.apiUrl}/products`, product, { headers });  // Envoie une requête POST pour ajouter un produit
  }

  // Fonction pour mettre à jour un produit existant
  updateProduct(id: number, product: any) {
    const token = localStorage.getItem('token');  // Récupère le token
    const headers = { Authorization: token || '' };  // Ajoute le token dans les en-têtes
    return this.httpProduits.put(
      `${this.apiUrl}/products/${id}`,  // URL du produit à mettre à jour
      product,  // Les données du produit à mettre à jour
      { headers }  // En-têtes de la requête
    );
  }

  // Fonction pour supprimer un produit
  deleteProduct(id: number) {
    const token = localStorage.getItem('token');  // Récupère le token
    const headers = { Authorization: token || '' };  // Ajoute le token dans les en-têtes
    return this.httpProduits.delete(`${this.apiUrl}/products/${id}`, { headers });  // Envoie une requête DELETE pour supprimer un produit
  }
}