import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { local } from '../constant';
import { AuthService } from '../service/auth.service';
import { Observable, Observer } from 'rxjs';
import { TokenHelper } from '../authorization/token.helper';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService,
        private tHelper: TokenHelper) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return Observable.create((observer: Observer<boolean>) => {
            let token: string = this.tHelper.getToken();
            // console.log('canActive',token)
            if (token) {
                this.authService.isAuth().subscribe(res => {
                    // console.log(res)
                    let r: any = res as any;
                    this.tHelper.setUser(r.data);
                    observer.next(true);
                }, err => {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    observer.error(err);
                });
            } else {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                observer.error('notoken');
            }
        });


    }
}
