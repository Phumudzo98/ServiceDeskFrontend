import { Component, OnInit, HostListener, ElementRef  } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {


  constructor(private _snackBar: MatSnackBar) {}

     subscriptionForm:FormGroup = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl('',[Validators.required]),
      expDate: new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, this.validateNumber.bind(this)]),
      agents: new FormControl('', [Validators.required, this.validateNumber.bind(this)])
     })

      //Toggling through the buttons
      currentForm: string = 'form1';

      toggleForms(form: string) {
        this.currentForm = form;
      }


//Validating Agents number

validateNumber(control: AbstractControl): ValidationErrors | null {
  if (isNaN(control.value)) {
    return { 'notANumber': true };
  }
  return null;
}
isDropdownOpen: boolean[] = []; // Assuming there are three dropdowns
isDeactivating: boolean = false;
loading: boolean = false;
buttonText: string = 'Deactivate'; 
isButtonDisabled: boolean = false;


//Deactivating
toggleDropdown(index: number) {
  this.isDropdownOpen[index] = !this.isDropdownOpen[index];

  for (let i = 0; i < this.isDropdownOpen.length; i++) {
    if (i !== index) {
      this.isDropdownOpen[i] = false;
    }
  }
}
isConfirmingDeactivation: boolean = false;



confirmDeactivation() {
  this.isConfirmingDeactivation = true;
  this.loading = true; 
  

  setTimeout(() => {
      
      this.isDeactivating = !this.isDeactivating; 
      this.loading = false;
      this.isConfirmingDeactivation = false; 

      this.closeDropdown();

      
      this.buttonText = 'Activate';
  }, 2000); 
}

confirmDeactivation2() {
  this.isConfirmingDeactivation = true; 
  this.loading = true; 
  

  setTimeout(() => {
      this.isDeactivating = !this.isDeactivating; 
      this.loading = false;
      this.isConfirmingDeactivation = false; 

      this.closeDropdown();

      this.buttonText = 'Deactivate';
  }, 2000); 
}

closeDropdown() {
  // Close all dropdowns
  for (let i = 0; i < this.isDropdownOpen.length; i++) {
    this.isDropdownOpen[i] = false;
  }
}  
//Calling the user-employee form

addVisible: boolean = false;
toggleAddForms() {
  this.addVisible = !this.addVisible;
}

//Closing the form if the user press at any other part of the page
/*
@HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
    if (!target.closest('.addButton') && !target.closest('app-package-form')) {
      this.addVisible = false;
    }
  }*/
get add_subscriber (){return this.subscriptionForm.controls;}

}
