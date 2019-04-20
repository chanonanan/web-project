import { Component, OnInit } from '@angular/core';
import { TokenHelper } from 'authorization/token.helper';
import { UserModel } from 'model/user';
import { Router } from '@angular/router';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-sidebar-left-inner',
  templateUrl: './sidebar-left-inner.component.html',
  styleUrls: ['./sidebar-left-inner.component.css']
})
export class SidebarLeftInnerComponent implements OnInit {
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
  logout() {
    this.tHelper.signOutLocal();
    this.router.navigate(['/login']);
  }
}

