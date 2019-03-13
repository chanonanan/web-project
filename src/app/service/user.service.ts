import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  getUser(name:string) {
    let params = new HttpParams().set('name', name);
    return this.http.post(apiConst.HOST + apiConst.USER_URL+'/player',{'name':name}, this.tHelper.setHeader({}));
  }
  // auth(username: string, password: string) {
  //   console.log(username,password)
  //   return this.http.post(apiConst.HOST + apiConst.AUTH_URL, {
  //     username: username,
  //     password: password
  //   }, this.tHelper.setHeader());
  // }
}
