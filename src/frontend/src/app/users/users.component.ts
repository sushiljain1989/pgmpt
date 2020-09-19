import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {ProjectsService} from "../projects.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
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
    this.usersService.getUsers( this.currentPage, this.pageSize ).subscribe( (data: any ) => {
      this.users = data.results;
      this.total = data.totalCount;
      this.generatePageNumbers();
    });

  }

  constructor(private usersService: UsersService) {
    this.gotoPage = this.gotoPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  ngOnInit(): void {
    this.usersService.getUsers(1, this.pageSize || 10).subscribe( (data:any) => {
      this.users = data.results;
      this.total = data.totalCount;
      this.generatePageNumbers();
    });
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
