import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { TicketDetailsComponent } from 'src/app/Employee/ticket-details/ticket-details.component';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';
import { CompanyTicketDetailsComponent } from '../company-ticket-details/company-ticket-details.component';

@Component({
  selector: 'app-company-tickets',
  templateUrl: './company-tickets.component.html',
  styleUrls: ['./company-tickets.component.css']
})
export class CompanyTicketsComponent implements OnInit{

  ticketForm:FormGroup = new FormGroup({
    assignee: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    type: new FormControl('',[Validators.required]),
    priority_status: new FormControl ('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required])

  })

  constructor(private http: HttpClient, private storage : StorageService){}

  activeTab: string = 'tab1';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  //Toggling through the buttons
  currentForm: string = 'unresolved';

  toggleForms(form: string) {
    this.currentForm = form;
  }
  //Filter toggle
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
}
  applyFilters() {
    this.showDropdown=false
  }

  startDate: Date = new Date();
  endDate: Date = new Date();
  
  get new_ticket (){return this.ticketForm.controls;}

  dataArray:any[]=[]

  

  ngOnInit():void {

    const token = this.storage.getUser()
    const decodedToken:any=jwtDecode(token);
    const companyId=decodedToken.companyId;


    let url:string="http://localhost:8080/api/ticket/get-tickets/"+companyId;

    this.http.get<any[]>(url).subscribe(data=>{
      
      this.dataArray=data;
      console.log(data);
    },
  error=>
  {
    console.log(error);
    
  })

  
}




}
