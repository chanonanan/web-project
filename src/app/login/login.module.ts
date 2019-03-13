import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from 'login/login-routing.module';
import { LoginComponent } from 'login/login.component';
import { TokenHelper } from 'authorization/token.helper';
import { AuthService } from 'service/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TokenHelper, AuthService],
  exports: [LoginComponent]
})
export class LoginModule { }
