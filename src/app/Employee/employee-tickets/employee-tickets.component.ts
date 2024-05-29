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

  currentMenuItem: string = 'opened'; // Initialize with the default active menu item
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
  successMessage: string ='';
  constructor(private formBuilder: FormBuilder, private storage:StorageService,private router: Router, private http:HttpClient,private AuthService:AuthService) {
    this.filterForm = this.formBuilder.group({
      status: new FormControl(''),
      priority: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),

    });
  }
  dataArray:any[]=[]
  currentPage: number = 0;
  pageSize: number = 2;

  ngOnInit(): void {

    const token = this.storage.getUser();
    const decodedToken:any = jwtDecode(token);
    const customerId=decodedToken.accountId;
    this.companyName=decodedToken.companyId;

    this.ticketForm= new FormGroup({

      /*email: new FormControl('',[Validators.required,Validators.email]),
    priority_status: new FormControl ('',[Validators.required]),*/
    category: new FormControl('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required]),
    otherCategory: new FormControl('',[Validators.required])
  
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

  showOtherCategoryInput: boolean = false;

  onCategoryChange() {
    const categoryControl = this.ticketForm.get('category');
    if (categoryControl) {
      const selectedCategory = categoryControl.value;
      if (selectedCategory === 'other') {
        this.showOtherCategoryInput = true;
        const otherCategoryControl = this.ticketForm.get('otherCategory');
        if (otherCategoryControl) {
          otherCategoryControl.setValidators(Validators.required);
        }
      } else {
        this.showOtherCategoryInput = false;
        const otherCategoryControl = this.ticketForm.get('otherCategory');
        if (otherCategoryControl) {
          otherCategoryControl.clearValidators();
        }
      }
      const otherCategoryControl = this.ticketForm.get('otherCategory');
      if (otherCategoryControl) {
        otherCategoryControl.updateValueAndValidity();
      }
    }
  }


  activeTab: string = 'tab1';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  //Toggling through the buttons
  currentForm: string = 'opened';

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
    const decodedToken: any = jwtDecode(token);
    const companyNo = decodedToken.companyId;
    const empNo = decodedToken.accountId;

    let category = this.ticketForm.value.category;
    if (category === 'other') {
      category = this.ticketForm.value.otherCategory;
    }

    const ticketCreate = {
      'category': category,
      'description': this.ticketForm.value.ticketBody,
      'customerUserId': `${empNo}`
    };

    let url2="http://localhost:8080/api/ticket/request-service/"+companyNo;

    this.http.post<any>(url2, ticketCreate).subscribe(response => {
      console.log("Yes", response);
      setTimeout(() => {
        this.showSpinner = false;
        this.successMessage = 'Ticket created successfully!';
        this.router.navigate(['/employee-tickets']);
        location.reload();
      }, 3000); // 5 seconds delay
    },
    //What happened
    error => {
      console.log("No", error);
      this.showSpinner = false;
    });
  }

  //Reset The filter

  startDate: Date = new Date("");
  endDate: Date = new Date("");
  priority: string = "";
  status: string = "";

  showSpinner2: boolean = false;
  applyFilterSpinner: boolean = false;

  //Filtering
  resetFilters() {
      this.showSpinner2 = true;
        setTimeout(() => {
          this.startDate = new Date(""); 
          this.endDate = new Date("");
          this.priority = "";
          this.status = "";
          this.showSpinner2 = false;
      }, 2000);
  }
  //apply filter
  applyFilter()
  {
    this.applyFilterSpinner = true;
    setTimeout(() =>
      {
        //Add other filter logic
        this.applyFilterSpinner = false;
      }, 2000);
  }

  //Only displaying two tickets the next/previous will display other two tickets
  
  get paginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.dataArray.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.dataArray.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  
   //Closing the dropdwon
   closeFilter(dropdown: string) {
    this.showDropdown = false;
  }

  newInfo: boolean = true;

}