import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, IStompSocket, Message } from '@stomp/stompjs';
import jwtDecode from 'jwt-decode';
import { Observable, map, of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { RespondMessage } from 'src/app/utility/models/models';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient,
    private route: ActivatedRoute,
    private token: StorageService) { }

  dataArray: any;
  ticketId: any;
  message: string = '';
  stompClient: Client = new Client();
  messageList?: Observable<Array<RespondMessage>>;
  messages: RespondMessage[] = [];
  newMessage: string = '';
  accountId!:any;

  navigateToDestination() {
      this.router.navigate(['/employee-tickets']);
  }

  //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }

  ngOnInit():void
  {

    
      this.route.paramMap.subscribe(param => {
        this.ticketId = param.get('ticketId');
  
        let url = "http://localhost:8080/api/ticket/get-ticket/" + this.ticketId;
  
        this.http.get<any>(url).subscribe(response => {
          this.dataArray = response;
        }, error => {
          console.log("Something went wrong");
        });
      });
      
      this.connect();
      
  }

  private connect(): void {
    this.stompClient.webSocketFactory = (): IStompSocket => {
      return new SockJS('http://localhost:8081/chat') as IStompSocket;
    };

    this.loadChat();
   

    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe("/topic/messages/" + this.ticketId, (message: Message) => {
        const receivedMsg = JSON.parse(message.body) as RespondMessage;
        this.messageList = this.messageList?.pipe(map((d: RespondMessage[]) => [...d, receivedMsg]));
        this.messages.push(receivedMsg);
      });
    }

    this.stompClient.activate();
  }

  private loadChat(): void {
    this.messageList = this.http.get<Array<RespondMessage>>("http://localhost:8081/get-messages/" + this.ticketId);

    this.messageList.subscribe(d => {
      let mesg: Array<RespondMessage> = d;

      mesg.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
      this.messageList = of(mesg);
      this.messages = mesg; 

      console.log("Here", mesg);
    });
  }

  

  public sendMessage(): void {
    let getUserToken = this.token.getUser();
    let getUserId: any = jwtDecode(getUserToken);
    this.accountId = getUserId.accountId;

    let message = {
      'sender': this.accountId,
      'content': this.newMessage
    };

    this.stompClient.publish({
      destination: '/app/chat/' + this.ticketId,
      body: JSON.stringify(message)
    });

    this.newMessage = "";
  }

}
