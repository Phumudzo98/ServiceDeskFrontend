import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/utility/models/department.data';
import { DynamicDataService } from 'src/app/utility/services/Dynamic/dynamic_data.service';
import { TicketService } from 'src/app/utility/services/tickets.service';
import { TicketsinfoComponent } from '../ticketsinfo/ticketsinfo.component';
import { Alert } from 'src/app/utility/alert/alert';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{

  filterTerm!: string;
  category=Categories;
  defaultComponent: any;
  info:any;
  selectedAttachment!: File;
  companyId:any;
  customerId:any;
  message:any;

  constructor(private dataservice: DynamicDataService,/*private ticketservice:TicketService,*/private alert:Alert)
  {this.defaultComponent = TicketsComponent;}
  ticketForm= new FormGroup({Subject: new FormControl('',Validators.required),
                            Description:new FormControl('',Validators.required),
                            Categories:new FormControl('',Validators.required),
                            document: new FormControl('', Validators.required),})
  get v (){
    return this.ticketForm.controls;
    }
    openComponent(value:string){
      switch (value){
        case "viewtickets":
        this.defaultComponent=TicketsinfoComponent;
        break;}}
    ngOnInit(): void {}
    switch():void{ this.dataservice.putDataStream("viewtickets")}
    getAttachment(event:any):void{this.selectedAttachment = event.target.files[0]}
    
    /*createTicket():void{
    this.ticketservice.postTicket(this.companyId.sub,this.customerId).subscribe(
      {next:data=>{this.message=data;
      this.alert.Toast.fire({icon:'success',title: this.message.message});
      }}
    )}*/
}
