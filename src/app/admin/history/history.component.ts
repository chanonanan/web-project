import { Component, OnInit } from '@angular/core';
import { TestService } from 'service/test.service';
import { ApiResponse } from 'model/apiResponse';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  isLoading = true;
  currentPage:number;
  total:any;
  perPage:any;
  search_text = '';
  order = '';
  sort = '';
  tests = [];
  constructor(
    private testService: TestService,
  ) { }

  ngOnInit() {
    this.getAllTest(1);
  }

  getAllTest(page:number){
    // this.isLoading = true;
    this.testService.getAllTest(page,this.sort,this.order,this.search_text).subscribe(res =>{
      console.log(res)
      let result:ApiResponse;
      result = res as ApiResponse;
      console.log(result.data)
      this.currentPage = result.data.this_page;
      this.total = result.data.total_item;
      this.perPage = result.data.per_page;
      this.tests = result.data.test;
      this.isLoading = false;
    })

  }

  sortData(sort){
    // console.log(sort);
    // console.log(sort.direction.toUpperCase());
    this.order = sort.direction.toUpperCase();
    this.sort = sort.active;
    if(this.order == ""){
      this.sort = "";
    }
    if(this.sort == "status"){
      this.sort = "last_login";
    }
    this.getAllTest(1);
  }

  search(){
    this.getAllTest(1);
  }

  getPage(page: number){
    this.getAllTest(page);
  }
}
