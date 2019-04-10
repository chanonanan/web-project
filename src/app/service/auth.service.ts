import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';
import { RegisterForm } from 'model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  isAuth() {
    return this.http.get(apiConst.HOST + apiConst.OWN_USER_URL, this.tHelper.setHeader({}));
  }
  auth(username: string, password: string) {
    console.log(username,password)
    return this.http.post(apiConst.HOST + apiConst.AUTH_URL, {
      username: username,
      password: password
    }, this.tHelper.setHeader({}));
  }
  register(regis:RegisterForm) {
    return this.http.post(apiConst.HOST + apiConst.REGISTER_URL, regis, this.tHelper.setHeader({}));
  }
}
