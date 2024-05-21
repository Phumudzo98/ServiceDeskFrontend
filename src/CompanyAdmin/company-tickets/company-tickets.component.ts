import { Component, HostListener, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-tickets',
  templateUrl: './company-tickets.component.html',
  styleUrls: ['./company-tickets.component.css']
})
export class CompanyTicketsComponent {

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
      }, 5000);
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



}
