import { Injectable } from '@angular/core';
import { local } from '../constant';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TokenHelper {

    constructor(private http: HttpClient) { }

    setHeader() {
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