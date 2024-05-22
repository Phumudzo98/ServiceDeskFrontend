import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';

@Component({
  selector: 'app-company-ticket-details',
  templateUrl: './company-ticket-details.component.html',
  styleUrls: ['./company-ticket-details.component.css']
})
export class CompanyTicketDetailsComponent {

  constructor(private router: Router, private http:HttpClient, private route: ActivatedRoute) { }

  navigateToDestination() {
      this.router.navigate(['/employee-tickets']);
  }

  //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }

 

  

  dataArray:any;
  ticketId:any;
  message:string=''
  //stompClient: Client = new Client;
  //messageList?: Observable<Array<RespondMessage>>;
  //messages: RespondMessage[] = [];

 ngOnInit(): void {
   this.route.paramMap.subscribe(param=>
     {
       this.ticketId=param.get('ticketId');
       
       let url ="http://localhost:8080/api/ticket/get-ticket/"+this.ticketId;
       
       this.http.get<any>(url).subscribe(respone=>{
        
        this.dataArray=respone;
         
       },
       error=>
       {
         console.log("Something went wrong");
       })

     }
   )
  // this.connect();
 }

 // private connect(): void {

 //   this.stompClient.webSocketFactory = (): IStompSocket => {
 //     return <IStompSocket>(<unknown>new SockJS('http://localhost:8081/chat'));
 //   };

 //   this.stompClient.onConnect = (frame) => {
     
 //     this.stompClient.subscribe("/topic/messages/" + this.ticketId, (message: Message) => {
 //       const receivedMsg = JSON.parse(message.body) as RespondMessage;
 //       this.messageList = this.messageList?.pipe(map((d: RespondMessage[]) => [...d, receivedMsg]))
 //       this.messages.push(receivedMsg);
 //     });
 //   }
 //   this.stompClient.activate();
 // }

 sendMessage():void{

   
   
   


 }
}
