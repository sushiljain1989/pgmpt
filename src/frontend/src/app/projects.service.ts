import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public getProjects(){
    return this.httpClient.get(this.REST_API_SERVER + '/api/projects');
  }

}
