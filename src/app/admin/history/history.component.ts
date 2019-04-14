import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  getData(page:number){
    // this.client.getClients(page,this.sort,this.order,this.search_text).subscribe(result => {
    //   let res: ApiResponse;
    //   // console.log("getClient",result)
    //   res = result as ApiResponse;
    //   this.isLoading = false;
    //   if (res.successful) {
    //     this.clients = res.data.clients;
    //     this.currentPage = res.data.this_page;
    //     this.total = res.data.total_item;
    //     this.perPage = res.data.per_page;
        
    //     this.clients.forEach(client => {
    //       var now = new Date();
    //       var login = Date.parse(client['last_login']);
    //       if ((now.getTime() - login) / 60000 < 5) {
    //         client['status'] = true;
    //       }
    //     });
    //     // console.log(this.clients)
    //   }
    // });
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
    this.getData(this.currentPage);
  }

  search(){
    // console.log(this.search_text)
    this.getData(1);
  }
}
