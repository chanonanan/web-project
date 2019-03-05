import { Component, OnInit } from '@angular/core';
import { TokenHelper } from '../../../authorization/token.helper';
// import { UserModel } from '../../../model/user';
import { Router } from '@angular/router';
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent implements OnInit {
  user:any;
  constructor(private tHelper:TokenHelper,
    private router: Router){

  }
  ngOnInit(){
    this.user = this.tHelper.getUser();
  }
  changePassword(){
    this.router.navigate(['/changepassword']);
  }
  logout(){
    this.tHelper.signOutLocal();
    this.router.navigate(['/login']);
  }
}
