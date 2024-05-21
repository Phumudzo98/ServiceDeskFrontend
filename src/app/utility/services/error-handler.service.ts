import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleHttpError(error: HttpErrorResponse):Observable<never> {
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      //client-error error
      errorMessage=`Error: ${error.error.message}`;
    }else{
      //server-side error;
      errorMessage=`Error Code ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage)
    return throwError(()=>errorMessage);
  }
}
