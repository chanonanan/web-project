import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserModel } from 'model/user';
import { ApiResponse } from 'model/apiResponse';
import { TestCreate, Style } from 'model/test';
import { TokenHelper } from 'authorization/token.helper';
import { TestService } from 'service/test.service';
import { UserService } from 'service/user.service';
import { PatternService } from 'service/pattern.service';

import { Observable } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from "@angular/router";

import Swal from 'sweetalert2'


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  coach: UserModel;
  testForm: FormGroup;
  athlete_name = new FormControl();
  athletes = [{ 'name': 'asdas' }];
  isFormLoading = true;
  filteredOptions = [];
  patternOptions = [];
  isLoading = false;
  styles: Style[] = [
    { value: 0, viewValue: 'Fix Pattern not allow error' },
    { value: 1, viewValue: 'Fix Pattern allow error' },
    { value: 2, viewValue: 'Free run' }
  ];
  public toggleDropdown2 = true;
  constructor(
    private formBuilder: FormBuilder,
    private tHelper: TokenHelper,
    private testService: TestService,
    private userService: UserService,
    private patternService: PatternService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.coach = this.tHelper.getUser() as UserModel;
    console.log('coach', this.coach);
    if(this.coach.role_id!=0){
      Swal.fire({
        title: "No permission!",
        type: "warning",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
      }).then(res=>{
        this.router.navigate(['/']);
      }); 
    }else{
      this.testForm = this.formBuilder.group({
        test_name: [null, [Validators.required]],
        date: [new Date(), [Validators.required]],
        athlete_id: [null, [Validators.required]],
        coach_id: [this.coach.id, [Validators.required]],
        pattern_id: [null, [Validators.required]],
        pattern_name: [null],
        pattern: [null],
        athletes_name: [null],
        style: [null, [Validators.required]]
      });
      this.testForm
        .get('athletes_name')
        .valueChanges
        .pipe(
          debounceTime(300),
          tap(() => this.isLoading = true),
          switchMap(value => this.userService.getAthlete(value)
            .pipe(
              finalize(() => this.isLoading = false),
            )
          )
        )
        .subscribe(users => {
          let result: ApiResponse;
          result = users as ApiResponse;
          if (result.successful) {
            this.filteredOptions = result.data;
          } else {
            this.filteredOptions = [];
          }
  
          console.log(result)
        }, err => {
          let result: ApiResponse;
          result = err as ApiResponse;
          this.filteredOptions = [];
        });
  
      this.testForm
        .get('pattern_name')
        .valueChanges
        .pipe(
          debounceTime(300),
          tap(() => this.isLoading = true),
          switchMap(value => this.patternService.getPattern(value)
            .pipe(
              finalize(() => this.isLoading = false),
            )
          )
        )
        .subscribe(users => {
          let result: ApiResponse;
          result = users as ApiResponse;
          if (result.successful) {
            this.patternOptions = result.data;
          } else {
            this.patternOptions = [];
          }
  
          console.log(result)
        }, err => {
          let result: ApiResponse;
          result = err as ApiResponse;
          this.patternOptions = [];
        });
  
  
      this.isFormLoading = false;
    }
    

  }

  onSubmitForm() {
    this.isFormLoading = true;
    let test: TestCreate = this.testForm.value;
    console.log(this.testForm.value)
    this.testService.createTest(this.testForm.value).subscribe(res => {
      this.isFormLoading = false;
      let result: ApiResponse;
      result = res as ApiResponse;
      // alert(result.message);
      console.log(result);
      this.router.navigate(['/test', 'view', result.data['id']]);
    }, err => {
      this.isFormLoading = false;
      let result: ApiResponse;
      result = err as ApiResponse;
      alert(result.message);
    })
  }

  selectAthlete(id) {
    console.log(this.testForm)
    this.testForm.controls.athlete_id.setValue(id);
  }

  selectPattern(id) {
    this.testForm.controls.pattern_id.setValue(id);
  }

  tabPattern(create) {
    console.log("tab")
    this.testForm.controls.pattern_id.setValue(null);
    this.testForm.controls.pattern.setValue(null);
    this.testForm.controls.pattern_name.setValue(null);
    if (create) {
      this.testForm.get('pattern_id').clearValidators();
      this.testForm.get('pattern').setValidators([Validators.required]);
      this.testForm.get('pattern_name').setValidators([Validators.required]);
    } else {
      this.testForm.get('pattern_id').setValidators([Validators.required]);
      this.testForm.get('pattern').clearValidators();
      this.testForm.get('pattern_name').clearValidators();
    }
    this.testForm.get('pattern_id').updateValueAndValidity();
    this.testForm.get('pattern').updateValueAndValidity();
    this.testForm.get('pattern_name').updateValueAndValidity();
  }

  styleChange(change) {
    console.log(change);
    this.testForm.controls.pattern_id.setValue(null);
      this.testForm.controls.pattern.setValue(null);
      this.testForm.controls.pattern_name.setValue(null);
    if (change == 2) {
      this.testForm.get('pattern_id').clearValidators();
      this.testForm.get('pattern').clearValidators();
      this.testForm.get('pattern_name').clearValidators();
    } else {
      this.testForm.get('pattern_id').setValidators([Validators.required]);
      this.testForm.get('pattern').clearValidators();
      this.testForm.get('pattern_name').clearValidators();
    }
    this.testForm.get('pattern_id').updateValueAndValidity();
    this.testForm.get('pattern').updateValueAndValidity();
    this.testForm.get('pattern_name').updateValueAndValidity();
  }

  addPattern(add:string){
    let pattern:string = "";
    console.log(this.testForm.controls.pattern.value)
    if(this.testForm.controls.pattern.value != null){
      pattern = this.testForm.controls.pattern.value;
    }    
    pattern += add;
    this.testForm.controls.pattern.setValue(pattern);
  }
}
