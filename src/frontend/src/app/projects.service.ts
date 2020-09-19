import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public getProjects(page:number = 1, limit: number = 1){
    page = page < 1 ? 1: page;
    const skip = (page - 1) * limit;
    const queryParams = `?limit=${limit}&skip=${skip}`;
    return this.httpClient.get(this.REST_API_SERVER + '/api/projects' + queryParams);
  }

}
