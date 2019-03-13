import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserModel } from 'model/user';
import { ApiResponse } from 'model/apiResponse';
import { TestCreate } from 'model/test';
import { TokenHelper } from 'authorization/token.helper';
import { TestService } from 'service/test.service';
import { UserService } from 'service/user.service';
import { PatthenService } from 'service/patthen.service';

import { Observable } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from "@angular/router";




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  coach: UserModel;
  testForm: FormGroup;
  player_name = new FormControl();
  players = [{ 'name': 'asdas' }];
  isFormLoading = true;
  filteredOptions = [];
  patthenOptions = [];
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private tHelper: TokenHelper,
    private testService: TestService,
    private userService: UserService,
    private patthenService: PatthenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.coach = this.tHelper.getUser() as UserModel;
    console.log('coach',this.coach);
    this.testForm = this.formBuilder.group({
      test_name: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      player_id: [null, [Validators.required]],
      coach_id: [this.coach.id, [Validators.required]],
      patthen_id: [null, [Validators.required]],
      patthen_name: [null],
      patthen: [null],
      players_name: [null]
    });
    this.testForm
      .get('players_name')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.userService.getUser(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => {
        let result: ApiResponse;
        result = users as ApiResponse;
        if(result.successful){
          this.filteredOptions = result.data;
        }else{
          this.filteredOptions = [];
        }
        
        console.log(result)
      }, err => {
        let result: ApiResponse;
        result = err as ApiResponse;
        this.filteredOptions = [];
      });

      this.testForm
      .get('patthen_name')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.patthenService.getPatthen(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => {
        let result: ApiResponse;
        result = users as ApiResponse;
        if(result.successful){
          this.patthenOptions = result.data;
        }else{
          this.patthenOptions = [];
        }
        
        console.log(result)
      }, err => {
        let result: ApiResponse;
        result = err as ApiResponse;
        this.patthenOptions = [];
      });


    this.isFormLoading = false;
    this.userService.getUser('test').subscribe(res => {
      let result: ApiResponse;
      result = res as ApiResponse;
      console.log('find by name', result);
    }, err => {
      this.isFormLoading = false;
      let result: ApiResponse;
      result = err as ApiResponse;
      console.log(result);
    })

  }

  onSubmitForm() {
    this.isFormLoading = true;
    let test: TestCreate = this.testForm.value;
    console.log(test)
    this.testService.createTest(test).subscribe(res => {
      this.isFormLoading = false;
      let result: ApiResponse;
      result = res as ApiResponse;
      // alert(result.message);
      console.log(result);
      this.router.navigate(['/test','view',result.data['id']]);
    }, err => {
      this.isFormLoading = false;
      let result: ApiResponse;
      result = err as ApiResponse;
      alert(result.message);
    })
  }

  selectPlayer(id){
    this.testForm.controls.player_id.setValue(id);
  }

  selectPatthen(id){
    this.testForm.controls.patthen_id.setValue(id);
  }

  tabPatthen(create){
    if(create){
      this.testForm.get('patthen_id').clearValidators();
      this.testForm.get('patthen').setValidators([Validators.required]);
      this.testForm.get('patthen_name').setValidators([Validators.required]);
    }else{
      this.testForm.get('patthen_id').setValidators([Validators.required]);
      this.testForm.get('patthen').clearValidators();
      this.testForm.get('patthen_name').clearValidators();
    }
    this.testForm.get('patthen_id').updateValueAndValidity();
    this.testForm.get('patthen').updateValueAndValidity();
    this.testForm.get('patthen_name').updateValueAndValidity();
  }

}
