import { Component, ElementRef, HostListener, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/app/utility/models/department.data';

@Component({
  selector: 'app-employee-tickets',
  templateUrl: './employee-tickets.component.html',
  styleUrls: ['./employee-tickets.component.css']
})
export class EmployeeTicketsComponent
{

  currentMenuItem: string = 'unresolved'; // Initialize with the default active menu item
  previousMenuItem: string = ''; // Initialize with empty value

  constructor(private formBuilder: FormBuilder, private el: ElementRef) {

  }

  ticketForm:FormGroup = new FormGroup({

    /*email: new FormControl('',[Validators.required,Validators.email]),
    priority_status: new FormControl ('',[Validators.required]),*/
    category: new FormControl('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required]),
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
      }, 5000);
  }

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



//Filter toggle
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
 
  stopPropagation(event: Event) {
    event.stopPropagation();
}

   //Closing the window
   closeWindow() {
    this.showDropdown=false;
  }
  get new_ticket (){return this.ticketForm.controls;}
}
