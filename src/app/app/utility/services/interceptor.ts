import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { StorageService } from './Storage/storage.service'; 
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private errorHandler: ErrorHandlerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("skip")) { return next.handle(req); }
    let storeService = this.injector.get(StorageService);
    let token = storeService.getUser();
    if (Object.keys(token).length > 0) {
      token = token.replace(/"/g, "");
    }
    let request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      return this.errorHandler.handleHttpError(error);
    }));
  }
}