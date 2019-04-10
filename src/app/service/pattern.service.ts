import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  getPattern(search:string) {
    let params = new HttpParams().set('search', search);
    return this.http.post(apiConst.HOST + apiConst.PATTERN_URL,{'search':search}, this.tHelper.setHeader({}));
  }
  // auth(username: string, password: string) {
  //   console.log(username,password)
  //   return this.http.post(apiConst.HOST + apiConst.AUTH_URL, {
  //     username: username,
  //     password: password
  //   }, this.tHelper.setHeader());
  // }
}
