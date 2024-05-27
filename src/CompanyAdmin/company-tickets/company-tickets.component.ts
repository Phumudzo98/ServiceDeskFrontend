import { HttpClient } from '@angular/common/http';
import { Component, HostListener, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';

@Component({
  selector: 'app-company-tickets',
  templateUrl: './company-tickets.component.html',
  styleUrls: ['./company-tickets.component.css']
})
export class CompanyTicketsComponent implements OnInit{

  constructor(private http: HttpClient, private storage : StorageService){}

  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  ticketForm:FormGroup = new FormGroup({
    assignee: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    category: new FormControl('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required]),
    /*In a case "Other" was the option chosen*/
    otherCategory: new FormControl('',[Validators.required])
  })

  
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

  /*
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const dropdownElement = document.getElementById('dropdown');
    if (dropdownElement && dropdownElement.contains(event.target as Node)) {
      return;
    }
    this.showDropdown = false;
  }*/

  startDate: Date = new Date("");
  endDate: Date = new Date("");
  priority: string = "";
  status: string = "";

  showSpinner: boolean = false;
  userAdded: boolean = false;
  successMessage: string = '';

  showSpinner2: boolean = false;

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
  //Adding a ticket
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
      }, 5000); 
    }
  }

    //Closing the window
    closeWindow() {
      this.showDropdown=false;
    }
  
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


  //Only displaying two tickets the next/previous will display other two tickets
  currentPage: number = 0;
  pageSize: number = 2;
  
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

  
 

}
