import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() pages:number[];
  @Input() gotoPage:Function;
  @Input() pageSize:number;
  @Input() setPageSize:Function;
  constructor() { }

  ngOnInit(): void {
  }

}
