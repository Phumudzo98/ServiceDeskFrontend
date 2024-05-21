import { HttpHeaders } from "@angular/common/http";

export class Constants{
    public static BASE_URL='http://localhost:8080/';
    public static ORIGIN_URL='http://localhost:4200/';
}
   export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json','Access-Control-Allow-Origin': `${Constants.ORIGIN_URL}`,
        'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE','skip':'true'
      })
};