import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api as apiConst } from 'constant';
import { TokenHelper } from 'authorization/token.helper';
import { TestCreate } from 'model/test';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private socket;

  constructor(private http: HttpClient, private tHelper: TokenHelper) { }
  // createTest() {
  //   return this.http.get(apiConst.HOST + apiConst.TEST_URL, this.tHelper.setHeader());
  // }
  startTest(test){
    console.log(test);
    this.socket.emit('test', test);    
  }

  start(){
    this.socket.emit('start', true);    
  }

  stop(){
    this.socket.emit('stop', true);    
  }

  save(){
    this.socket.emit('save', true);    
  }

  getPattern() {
    let observable = new Observable(observer => {
      this.socket = io(apiConst.HOST);
      this.socket.on('pattern', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  } 
  getLap() {
    let observable = new Observable(observer => {
      this.socket.on('lap', (data) => {
        observer.next(data);    
      });
    })     
    return observable;
  } 
  getStartTime() {
    let observable = new Observable(observer => {
      this.socket.on('start', (data) => {
        observer.next(data);    
      });
    })     
    return observable;
  } 

  getStopTime() {
    let observable = new Observable(observer => {
      this.socket.on('stop', (data) => {
        observer.next(data);    
      });
    })     
    return observable;
  } 

  resetTest(test_id){
    return this.http.delete(apiConst.HOST + apiConst.TEST_URL + '/reset/' + test_id, this.tHelper.setHeader({}));
  }


  createTest(test:TestCreate) {
    return this.http.post(apiConst.HOST + apiConst.TEST_URL + '/create', test, this.tHelper.setHeader({}));
  }

  getTest(id){
    return this.http.get(apiConst.HOST + apiConst.TEST_URL + '/'+ id, this.tHelper.setHeader({}));
  }

  getAllTest(page:number,sort:string,order:string,search:string){
    let page_str = page.toString();
    let params = new HttpParams();
    params = params.append('page', page_str);
    if(sort != '' && sort != null){
      params = params.append('sort', sort);
    }
    if(order != '' && order != null){
      params = params.append('order', order);
    }
    if(search != '' && search != null){
      params = params.append('search', search);
    }
    return this.http.get(apiConst.HOST + apiConst.TEST_URL + '/all', this.tHelper.setHeader(params));
  }

  getHistory(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(apiConst.HOST + apiConst.HISTORY_URL, this.tHelper.setHeader(params));
  }
}
