import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private REST_API_SERVER = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  getClients(){
    return this.httpClient.get(this.REST_API_SERVER + '/api/clients');
  }
}
