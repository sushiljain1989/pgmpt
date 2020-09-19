import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../projects.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects = [];
  currentPage:number = 1;
  total: number = 0;
  pages: number[] = [];
  pageSize: number = 10;

  setPageSize(size: number){
    this.pageSize = size;
    this.gotoPage(1);
  }

  gotoPage(page){
    page = page < 1 ? 1 : page;
    this.currentPage = page;
    this.projectService.getProjects( this.currentPage, this.pageSize ).subscribe( (data: any ) => {
      this.projects = data.results;
      this.total = data.totalCount;
      this.generatePageNumbers();
    });

  }
  constructor(private projectService: ProjectsService) {
    this.gotoPage = this.gotoPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  ngOnInit(): void {
    this.projectService.getProjects(1, this.pageSize || 10).subscribe( (data: any) => {
      this.projects = data.results;
      this.total = data.totalCount;
      this.generatePageNumbers();
    } );
  }

  private generatePageNumbers(): void{
    let i = 1;
    this.pages = [];
    while ( i <= Math.ceil(this.total/this.pageSize ) ){
      this.pages.push( i );
      i++;
    }
  }

}
