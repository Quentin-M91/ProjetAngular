import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {


  constructor(private httpClient: HttpClient) { }
    login(body: any) {
      return this.httpClient.post<any>('http://localhost:3000/api/auth/login', body);
    }

    getUser() {
      const token = localStorage.getItem('token');
      console.log(token)
      if(!token) {
        throw new Error('No autorization token found');
      }

      const headers = {Authorization : token};
      return this.httpClient.get<any>('http://localhost:3000/api/users',{headers})

    }


}