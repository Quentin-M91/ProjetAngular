import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {


  constructor(private httpUsers: HttpClient) { }

  login(body: any) {
    return this.httpUsers.post<any>("http://localhost:3000/api/auth/login", body)
  }

  getProducts() {
    const token = localStorage.getItem("token")
    console.log(token)

    if (!token) {
      throw new Error('No authentification token found');
    }

    const headers = { Authorization: token }
    return this.httpUsers.get<any>("http://localhost:3000/api/users", { headers })
  }
}
