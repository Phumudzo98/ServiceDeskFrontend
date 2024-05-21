import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { StorageService } from './Storage/storage.service'; 
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private storage: StorageService, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.storage.isLoggedIn()) {
        return true; // Allow navigation
      } else {
        // Redirect to login page if not logged in
        return this.router.createUrlTree(['/company-login']);
      }
    }
}