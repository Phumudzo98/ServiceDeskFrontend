import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';
import { AuthService } from 'src/app/utility/services/auth.service';

@Component({
  selector: 'app-employee-tickets',
  templateUrl: './employee-tickets.component.html',
  styleUrls: ['./employee-tickets.component.css']
})
export class EmployeeTicketsComponent implements OnInit
{

  currentMenuItem: string = 'unresolved'; // Initialize with the default active menu item
  previousMenuItem: string = ''; // Initialize with empty value
  filterForm: FormGroup;
  ticketForm: any;
  companyName:string ="";



  email:string="";
  newPassword: string = '';
  error!: string;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  submittingForm: boolean = false;
  users: any[]=[];
  failedAccounts: any;
  file!: File;
  oldPassword: string = '';
  firstName: string='';
  lastName: string='';
  profileForm!: FormGroup;
  profileImage: string | ArrayBuffer | null | undefined;
  showSpinner: boolean | undefined;
  constructor(private formBuilder: FormBuilder, private storage:StorageService,private router: Router, private http:HttpClient,private AuthService:AuthService) {
    this.filterForm = this.formBuilder.group({
      status: new FormControl(''),
      priority: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),

    });
  }
  dataArray:any[]=[]

  ngOnInit(): void {

    console.log("Print")

    const token = this.storage.getUser();
    const decodedToken:any = jwtDecode(token);
    const customerId=decodedToken.accountId;
    this.companyName=decodedToken.companyId;



    this.ticketForm= new FormGroup({

      email: new FormControl(this.companyName,[Validators.required,Validators.email]),
      type: new FormControl('',[Validators.required]),
      priority_status: new FormControl ('',[Validators.required]),
      ticketBody: new FormControl('', [Validators.required])
  
    })

    let baseUrl:any="http://localhost:8080/api/ticket/get-user-tickets/";

    this.http.get<any[]>(baseUrl+customerId).subscribe(data=>
      {
        this.dataArray=data;
        
      },
      error=>
      {
        console.log("No",error);
      }
    )
    
  }


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

 
  
  get new_ticket (){return this.ticketForm.controls;}

  

  createTicket():void
  {
    

    const token = this.storage.getUser();
    const decodedToken:any = jwtDecode(token);
    const companyNo=decodedToken.companyId;
    const empNo=decodedToken.accountId;

    const ticketCreate={
      'category':this.ticketForm.value.type,
      'description':this.ticketForm.value.ticketBody,
      'customerUserId':`${empNo}`
    }

    let url2="http://localhost:8080/api/ticket/request-service/"+companyNo;

    

    this.http.post<any>(url2,ticketCreate).subscribe(response=>
      {
        console.log("Yes",response);
        this.router.navigate(['/employee-tickets'])
        location.reload();
      },
      error=>
      {
        console.log("No", error);
      }
      
    )
  }

  
}
