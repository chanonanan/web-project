import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from 'service/test.service';

import { ApiResponse } from 'model/apiResponse';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class TestViewComponent implements OnInit, OnDestroy {

  private routeSub: any;
  test_id: number;
  isLoading = true;
  info:any;
  labs = [];
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private testService: TestService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']);
      this.test_id = params['id'];
      this.testService.getTest(this.test_id).subscribe(res => {
        let result: ApiResponse;
        result = res as ApiResponse;
        this.isLoading = false;
        this.info = result.data;
        console.log(result)
      })
    })
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }



}
