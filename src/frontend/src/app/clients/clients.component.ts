import { Component, OnInit } from '@angular/core';
import {ClientsService} from '../clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
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
    this.clientService.getClients( this.currentPage, this.pageSize ).subscribe( (data: any ) => {
      this.clients = data.results;
      this.total = data.totalCount;
      this.generatePageNumbers();
    });

  }
  constructor(private clientService: ClientsService) {
    this.gotoPage = this.gotoPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  ngOnInit(): void {
    this.clientService.getClients(1, this.pageSize || 10).subscribe( (data: any) => {
      this.clients = data.results;
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
