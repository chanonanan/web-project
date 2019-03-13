import { Injectable } from '@angular/core';
import { local } from 'constant';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TokenHelper {

    constructor(private http: HttpClient) { }

    setHeader(params:any) {
        let auth:any;
        if(localStorage.getItem(local.token)){
            auth = localStorage.getItem(local.token);
        }else{
            auth = '';
        }
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': auth
            }),
            params: params
        };
    }

    setToken(token: string) {
        localStorage.setItem(local.token, token);
    }
    getToken() {
        return localStorage.getItem(local.token);
    }
    getUser() {
        try {
            return JSON.parse(localStorage.getItem(local.user));
        } catch (error) {
            return {};
        }
    }
    setUser(data: any) {
        localStorage.setItem(local.user, JSON.stringify(data));
    }
    signOutLocal() {
        localStorage.clear();
    }
}