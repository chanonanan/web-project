import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


  createTest(test:TestCreate) {
    return this.http.post(apiConst.HOST + apiConst.TEST_URL + '/create', test, this.tHelper.setHeader({}));
  }
  getTest(id:number){
    return this.http.get(apiConst.HOST + apiConst.TEST_URL + '/'+ id, this.tHelper.setHeader({}));
  }
}
