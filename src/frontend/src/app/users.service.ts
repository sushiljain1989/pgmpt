import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private REST_API_SERVER = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get( this.REST_API_SERVER + '/api/internal_users');
  }
}
