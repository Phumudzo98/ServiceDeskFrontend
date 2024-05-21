import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css']
})
export class PackageFormComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  defaultDesignation = 'Select Designation';
  
//Adding a Package form
subscriptionForm:FormGroup = new FormGroup({
  id: new FormControl('0'),
  name: new FormControl('',[Validators.required]),
  expDate: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required, this.validateNumber.bind(this)]),
  agents: new FormControl('', [Validators.required, this.validateNumber.bind(this)])
 })


  
  //Validating Agents number

validateNumber(control: AbstractControl): ValidationErrors | null {
  if (isNaN(control.value)) {
    return { 'notANumber': true };
  }
  return null;
}
  
 
  
  //Adding a package
  
  showSpinner: boolean = false;
  userAdded: boolean = false;
  successMessage: string = '';

  // Your form initialization and other existing code...

  addPackage() {
    if (this.subscriptionForm.valid) {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
        const packageName = this.subscriptionForm.get('name')?.value;
        this.successMessage = `Package "${packageName}" added successfully.`;
        this.subscriptionForm.reset();
        
        setTimeout(() => {
          this.successMessage = ''; 
        }, 3000); 
      }, 5000); 
    }
  }

  //Closing the window
  closeWindow() {
    this.close.emit();
  }
get add_subscriber (){return this.subscriptionForm.controls;}


}
