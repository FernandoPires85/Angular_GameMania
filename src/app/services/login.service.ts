import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email: any;

  constructor(private httpClient: HttpClient) { }

  url = "http://localhost:3000/login"

  login(usuario: User):Observable<any> {
    return this.httpClient.post(this.url, JSON.stringify(usuario), {
      headers: new HttpHeaders({ 'content-type': 'application/json'}),
      observe: "response"
    })
  }
}
