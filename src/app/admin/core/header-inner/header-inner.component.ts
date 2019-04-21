import { Component, OnInit } from '@angular/core';
import { TokenHelper } from 'authorization/token.helper';
import { UserModel } from 'model/user';
import { Router } from '@angular/router';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html',
  styleUrls: ['./header-inner.component.css']
})
export class HeaderInnerComponent implements OnInit {
  user: UserModel;
  constructor(private tHelper: TokenHelper,
    private router: Router) {

  }
  ngOnInit() {
    this.user = this.tHelper.getUser() as UserModel;
    // console.log(this.user)
  }
  profile() {
    this.router.navigate(['/profile']);
  }
  history() {
    this.router.navigate(['/history']);
  }
  dashboard() {
    this.router.navigate(['/']);
  }
  logout() {
    this.tHelper.signOutLocal();
    this.router.navigate(['/login']);
  }
}
