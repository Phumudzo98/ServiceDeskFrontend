import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Constants , httpOptions} from "../constants/constants";
@Injectable({
    providedIn: 'root'
})
export class TicketService {
    
    constructor(private httpClient: HttpClient) {}

    private refreshrequired = new Subject<void>();
    getRefreshRequired() {
        return this.refreshrequired;
    }
    public postTicket(companyId: any, customerUserId: any):Observable<any>{
        return this.httpClient.post(Constants.BASE_URL + "/request-service" + companyId,customerUserId,httpOptions).pipe(
            (tap(() => this.refreshrequired.next())),
            catchError(error => {
                return throwError(error);}) );
        }
    
    public updateTicket(ticketId:any,customerUserId: any): Observable<any> {
        return this.httpClient.put(Constants.BASE_URL  + "/update-ticket" + ticketId,customerUserId,httpOptions).pipe(
            (tap(() => this.refreshrequired.next())),
            catchError(error => {
                return throwError(error);}) );
        }
      //  public getTicket(customerUserId: any):Observable<any>{
        //    return this.httpClient.get(Constants.BASE_URL + "ticket/" + customerUserId).pipe(
           //     catchError(error=>{return throwError(error);} ));
           //  }
}