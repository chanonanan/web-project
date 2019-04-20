import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  getAthlete(name:string) {
    let params = new HttpParams().set('name', name);
    return this.http.post(apiConst.HOST + apiConst.USER_URL+'/athlete',{'name':name}, this.tHelper.setHeader({}));
  }

  getProfile(id:string,page:number,sort:string,order:string){
    let page_str = page.toString();
    let params = new HttpParams();
    params = params.append('page', page_str);
    params = params.append('id', id);
    if(sort != '' && sort != null){
      params = params.append('sort', sort);
    }
    if(order != '' && order != null){
      params = params.append('order', order);
    }
    return this.http.get(apiConst.HOST + apiConst.USER_URL, this.tHelper.setHeader(params));
  }

  update(user){
    return this.http.put(apiConst.HOST + apiConst.USER_URL + '/profile', user, this.tHelper.setHeader({}));
  }

}
