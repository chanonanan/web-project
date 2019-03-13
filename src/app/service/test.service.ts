import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';
import { TestCreate } from 'model/test';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  // createTest() {
  //   return this.http.get(apiConst.HOST + apiConst.TEST_URL, this.tHelper.setHeader());
  // }
  createTest(test:TestCreate) {
    return this.http.post(apiConst.HOST + apiConst.TEST_URL + '/create', test, this.tHelper.setHeader({}));
  }
  getTest(id:number){
    return this.http.get(apiConst.HOST + apiConst.TEST_URL + '/'+ id, this.tHelper.setHeader({}));
  }
}
