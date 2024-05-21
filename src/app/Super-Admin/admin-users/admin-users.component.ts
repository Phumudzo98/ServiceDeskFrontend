import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {


   //Toggling through the buttons
   currentForm: string = 'form1';

   toggleForms(form: string) {
     this.currentForm = form;
   }

   addUsers:FormGroup = new FormGroup({

    id: new FormControl('0'),
    name: new FormControl('',[Validators.required, this.noNumbersValidator()]),
    company_name: new FormControl('',[Validators.required, this.noNumbersValidator()]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    status: new FormControl('',[Validators.required]),
    
  })

  get new_user (){return this.addUsers.controls;}


   //Validating if the Full Name contains numbers

   noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fullNameRegex = /^[a-zA-Z\s]*$/;
  
      if (control.value && !fullNameRegex.test(control.value)) {
        return { containsNumbers: true };
      }
      return null;
    };
  }

  //Dropdown on an action Icon
 
  isDropdownOpen: boolean = false;

  toggleDropdown(event: Event): void {
      event.stopPropagation(); // Prevents the event from bubbling up to parent elements
      this.isDropdownOpen = !this.isDropdownOpen;
  }
   

}
