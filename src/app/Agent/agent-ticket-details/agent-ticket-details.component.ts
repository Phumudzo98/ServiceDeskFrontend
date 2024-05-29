import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';
import { Client, IStompSocket, Message } from '@stomp/stompjs';
import { RespondMessage } from 'src/app/utility/models/models';
import { Observable, map, of } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-agent-ticket-details',
  templateUrl: './agent-ticket-details.component.html',
  styleUrls: ['./agent-ticket-details.component.css']
})
export class AgentTicketDetailsComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private storage: StorageService, private route: ActivatedRoute, private token: StorageService) { }

  //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }

  dataArray: any;
  ticketId: any;
  message: string = '';
  stompClient: Client = new Client();
  messageList?: Observable<Array<RespondMessage>>;
  messages: RespondMessage[] = [];
  newMessage: string = '';
  accountId!:any;

  ngOnInit():void
  {

    
      this.route.paramMap.subscribe(param => {
        this.ticketId = param.get('ticketId');
  
        let url = "http://localhost:8080/api/ticket/get-ticket/" + this.ticketId;
  
        this.http.get<any>(url).subscribe(response => {
          this.dataArray = response;
          console.log(this.dataArray);
          
          let url2="http://localhost:8080/api/ticket/update-ticket";
          if(response.status=="Open")
            {
              const ticketUpdate={
                "ticketId":this.ticketId,
                "status":"In progress",
                "updateMessage":"",
                "escalatedToAgentId":""
              }

              this.http.put<any>(url2, ticketUpdate).subscribe(response=>{

                console.log(response);
                
              },error=>{
                console.log(response);
                
              }
            )

            }

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
      this.messages = mesg; // Add sorted messages to the messages array

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

  isCloseTicketFormVisible = false;

  toggleCloseTicketForm() {
    this.isCloseTicketFormVisible = !this.isCloseTicketFormVisible;
  }

 

}
