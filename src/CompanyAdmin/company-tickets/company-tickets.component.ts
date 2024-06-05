import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';

@Component({
  selector: 'app-company-tickets',
  templateUrl: './company-tickets.component.html',
  styleUrls: ['./company-tickets.component.css']
})

export class CompanyTicketsComponent implements OnInit {
  emailSuggestions: string[] = [];
  allEmails: string[] = [];

  assigneeSuggestions: string[] = [];
  allAssignees: string[] = [];
  searchQuery: string = ''; // Define searchQuery property
  tickets: any[]=[];

  constructor(private http: HttpClient, private storage: StorageService) {}


  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  ticketForm: FormGroup = new FormGroup({
     //assignee: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    category: new FormControl('', [Validators.required]),
    ticketBody: new FormControl('', [Validators.required]),
    /* In a case "Other" was the option chosen */
    otherCategory: new FormControl('', [Validators.required])
  });

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

  // Toggling through the buttons
  currentForm: string = 'opened';

  toggleForms(form: string) {
    this.currentForm = form;
  }

  // Filter toggle
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeFilter(dropdown: string) {
    this.showDropdown = false;
  }

  // Email suggestion handling
  onEmailInput(): void {
    const emailControl = this.ticketForm.get('email');
    if (emailControl) {
      const query = emailControl.value;
      if (query.length > 0) {
        this.emailSuggestions = this.allEmails.filter(email =>
          email.toLowerCase().startsWith(query.toLowerCase())
        );
      } else {
        this.emailSuggestions = [];
      }
    }
  }

  onSelectSuggestion(email: string): void {
    this.ticketForm.get('email')?.setValue(email);
    this.emailSuggestions = [];
  }

  // Assignee suggestion handling
  onAssigneeInput(): void {
    const assigneeControl = this.ticketForm.get('assignee');
    if (assigneeControl) {
      const query = assigneeControl.value;
      if (query.length > 0) {
        this.assigneeSuggestions = this.allAssignees.filter(assignee =>
          assignee.toLowerCase().startsWith(query.toLowerCase())
        );
      } else {
        this.assigneeSuggestions = [];
      }
    }
  }

  onAssigneeSuggestion(assignee: string): void {
    this.ticketForm.get('assignee')?.setValue(assignee);
    this.assigneeSuggestions = [];
  }

  startDate: Date = new Date("");
  endDate: Date = new Date("");
  priority: string = "";
  status: string = "";

  showSpinner: boolean = false;
  userAdded: boolean = false;
  successMessage: string = '';

  showSpinner2: boolean = false;
  applyFilterSpinner: boolean = false;

  // Reset Filters
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

  // Apply filter
  applyFilter() {
    this.applyFilterSpinner = true;
    setTimeout(() => {
      // Add other filter logic
      this.applyFilterSpinner = false;
    }, 2000);
  }

  // Adding a ticket
  addTicket() {
    if (this.ticketForm.valid) {
      this.showSpinner = true;

      setTimeout(() => {
        this.showSpinner = false;
        this.successMessage = `Ticket added successfully.`;
        this.ticketForm.reset();

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 3000);

    const token = this.storage.getUser();
    const decodedToken: any = jwtDecode(token);
    const companyId = decodedToken.companyId;

      let urlId:string ="http://localhost:8080/api/company/get-user-id";
      let userEmail=this.ticketForm.get('email')?.value;

      this.http.post<any>(urlId,userEmail).subscribe(response=>
        {
          console.log(response);

          let ticketDetail=
          {
            "category":this.ticketForm.get('category')?.value,
            "description":this.ticketForm.get('ticketBody')?.value,
            "customerUserId":response
          }
          
          if(response!=null)
            {
              let addTicketUrl="http://localhost:8080/api/ticket/request-service/"+companyId;

              this.http.post<any>(addTicketUrl,ticketDetail).subscribe(response=>
                {
                  console.log(response);
                },
                error=>
                  {
                    console.log(error);
                  }
              )
           }

        },error=>
        {
          console.log("Check if email is correct");
        }
        
      )
    }
  }

  // Closing the window
  closeWindow() {
    this.showDropdown = false;
  }

  get new_ticket() { return this.ticketForm.controls; }

  dataArray: any[] = []

  ngOnInit(): void {
    const token = this.storage.getUser();
    const decodedToken: any = jwtDecode(token);
    const companyId = decodedToken.companyId;
    this.tickets=this.tickets;
    this.getEmployeeAndAgent();

    let url: string = "http://localhost:8080/api/ticket/get-tickets/" + companyId;

    this.http.get<any[]>(url).subscribe(data => {
      this.dataArray = data;
      
    },
    error => {
      console.log(error);
    });
  }

  // Only displaying two tickets; the next/previous will display other two tickets
  currentPage: number = 0;
  pageSize: number = 2;
 
  get paginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.dataArray.slice(start, end);
  }

  hasNextPage(): boolean {
    const start = (this.currentPage + 1) * this.pageSize;
    return start < this.dataArray.length;
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  performSearchOpenTicket(): void {
    if (this.searchQuery.trim() === '') {
      this.ngOnInit(); // Reset to show all agents if search query is empty
        console.log(this.ngOnInit);
      
    } else {
      this.tickets = this.tickets.filter(user =>
        (user.priority && user.priority.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (user.description && user.description.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (user.category && user.category.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }

  empEmails:any=""

  getEmployeeAndAgent(){

    const token = this.storage.getUser();
    const decodedToken: any = jwtDecode(token);
    const companyId = decodedToken.companyId;

    let url = "http://localhost:8080/api/company/get-user-email";
    let url2 ="http://localhost:8080/api/company/get-agent-email";

    let searchEmployee=
    {
      "search":"",
      "companyID":companyId
    }

    this.http.post<[]>(url,searchEmployee).subscribe(response=>{

      this.allEmails=response;
      
    },error=>{
      console.log(error);
      
    })

    let searchAgent=
    {
      "search":"",
      "companyID":companyId
    }

    this.http.post<[]>(url2,searchAgent).subscribe(response=>{

      //console.log(response);
      this.allAssignees=response;
      
    },error=>{
      console.log(error);
      
    })
  }
}
