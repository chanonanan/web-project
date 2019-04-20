import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { UserService } from 'service/user.service';
import { ApiResponse } from 'model/apiResponse';
import { TokenHelper } from 'authorization/token.helper';


import { ProfileModel } from 'model/user';
import { identifierModuleUrl } from '@angular/compiler';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  private routeSub: any;
  isOwn = true;
  isLoading = true;
  isSubmit = false;
  profile: ProfileModel;
  tests = [];
  currentPage: number;
  total: any;
  perPage: any;
  order = '';
  sort = '';

  imageSrc: string = "assets/img/profile.png";
  userForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tHelper: TokenHelper,
    private formBuilder: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    console.log("init");
    this.routeSub = this.route.params.subscribe(params => {
      var user = this.tHelper.getUser();
      if (params['id']) {
        this.id = params['id'];
        if (this.id != user.id) {
          this.isOwn = false;
        }else{
          this.isOwn = true;
        }
      } else {
        this.id = user.id;
        this.isOwn = true;
      }
      this.getData(1);
    });

  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getData(page) {
    this.userService.getProfile(this.id, page, this.sort, this.order).subscribe(res => {
      console.log(res)
      let result: ApiResponse;
      result = res as ApiResponse;
      this.profile = result.data.user;
      if (this.profile.role_id == 0) {
        this.profile.role = "Coach";
        this.tests = result.data.user.Coach;
      } else if (this.profile.role_id == 1) {
        this.profile.role = "Athlete";
        this.tests = result.data.user.Athlete;
      }

      this.userForm = this.formBuilder.group({
        id: [this.profile.id, [Validators.required]],
        role_id: [this.profile.role_id, [Validators.required]],
        firstname: [this.profile.firstname, [Validators.required]],
        lastname: [this.profile.lastname, [Validators.required]],
        email: [this.profile.email, [Validators.required, Validators.email]],
        img: [this.profile.img],
      });

      this.currentPage = result.data.this_page;
      this.total = result.data.total_item;
      this.perPage = result.data.per_page;
      this.isLoading = false;

    })
  }

  sortData(sort) {
    // console.log(sort);
    // console.log(sort.direction.toUpperCase());
    this.order = sort.direction.toUpperCase();
    this.sort = sort.active;
    if (this.order == "") {
      this.sort = "";
    }
    this.getData(1);
  }

  getPage(page: number) {
    this.getData(page);
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
        this.userForm.controls.img.setValue(event.target.result);
      }
      console.log(this.imageSrc);

      reader.readAsDataURL(file);
    }
  }

  onSubmitForm() {
    this.isSubmit = true;
    console.log(this.userForm.value)
    this.userService.update(this.userForm.value).subscribe(res => {
      let result: ApiResponse;
      result = res as ApiResponse;
      // alert(result.message);
      console.log(result);
      if (result.successful) {
        Swal.fire({
          title: "Save!",
          type: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        }).then(res=>{
          location.reload();
        });
        
      }
      // this.router.navigate(['/test', 'view', result.data['id']]);
    }, err => {
      this.isSubmit = false;
      let result: ApiResponse;
      result = err as ApiResponse;
      // alert(result.message);
      Swal.fire({
        title: "Error!",
        type: "error",
        text: result.message,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
