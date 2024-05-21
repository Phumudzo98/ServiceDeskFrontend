import { Injectable } from "@angular/core";
import { BehaviorSubject} from "rxjs";

@Injectable({providedIn:'root'})

export class DynamicDataService { private dataStream=new BehaviorSubject("");
constructor(){} 
getDataStream(){
    return this.dataStream.asObservable();
}
putDataStream(data:any){
    this.dataStream.next(data);
}
}