import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Login } from '../models/models';
import { Observable, catchError } from 'rxjs';
import { Constants, httpOptions } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: any;

  constructor(private httpClient: HttpClient) {}
   isAccountExpired(): boolean {
    if (!this.currentUser) {
      return true; 
    }
    const expirationDate = new Date(this.currentUser.expiration);
    const currentDate = new Date();
    return expirationDate < currentDate;
  }
  public login(data: Login):Observable<Object> {
    return this.httpClient.post(Constants.BASE_URL + "/api/customer/{companyId}/" + data,httpOptions).pipe()
    }
  public register(data:Account):Observable<Object> {
    return this.httpClient.post(Constants.BASE_URL + "/api/customer/{companyId}/" + data,httpOptions).pipe()
    }
  }
