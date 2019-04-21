import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'service/test.service';
import { ApiResponse } from 'model/apiResponse';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class HistoryViewComponent implements OnInit {

  private routeSub: any;
  history:any;
  labs:any;
  isLoading = true;
  result:any;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      
      if(params['id']){
        console.log(params['id'])
        this.testService.getHistory(params['id']).subscribe(res =>{
          console.log(res)
          let result: ApiResponse;
          result = res as ApiResponse;
          this.history = result.data.test; 
          this.labs = result.data.record; 
          this.result = this.barChart(this.labs,null);
          for(let lab of this.labs){
            var d = new Date(lab['duration']);
            lab['time'] = [d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()]
        }
          this.isLoading = false;
        })
      }
    });
    
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  barChart(data:any,title:string){
      
    let result = {
        title: title,
        name: [],
        value: [],
    };
  for(let i of data){
      result.name.push(i.lap);
      result.value.push(i.duration/1000);
  }
  return result;
}

}
