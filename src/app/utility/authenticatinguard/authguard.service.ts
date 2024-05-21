import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/Storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private storage:StorageService,private router:Router){}
    tokenFromStorage!:any;
    value!:any;

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(next, url);
    }

    checkUserLogin(route:ActivatedRouteSnapshot, url: any):boolean{
        if(this.router.url==='/login'){
            return true;
        }
        if(this.storage.isLoggedIn()){
            this.tokenFromStorage = sessionStorage.getItem("auth-user");
            this.value = jwt_decode(this.tokenFromStorage);

            const user_role=this.value.role;
            const allowedRoles = route.data['roles'];
        
            if(!allowedRoles.includes(user_role)){
                this.router.navigate(['/auth']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
        
    }
}

function jwt_decode(tokenFromStorage: any): any {
    throw new Error('Function not implemented.');
}
