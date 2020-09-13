import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../projects.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects = [];
  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe( (data: any[]) => {
      console.log( data );
      this.projects = data;
    } );
  }

}
