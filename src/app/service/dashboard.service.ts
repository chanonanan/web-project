import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  get(id:string) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(apiConst.HOST + apiConst.DASHBOARD_URL, this.tHelper.setHeader(params));
  }

}
