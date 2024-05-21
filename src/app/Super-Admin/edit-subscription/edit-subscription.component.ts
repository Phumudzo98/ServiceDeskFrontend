import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css']
})
export class EditSubscriptionComponent {

  constructor(private router: Router){}

  editForm: FormGroup = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl('Subscription Name',[Validators.required]),
    price: new FormControl('50', [Validators.required, this.validateNumber.bind(this)]),
    agents: new FormControl('5', [Validators.required, this.validateNumber.bind(this)]
    ),
    customerLink: new FormControl('Yes',[Validators.required]),
    status: new FormControl('Active', [Validators.required])

  })

  get edit (){return this.editForm.controls;}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

//Validating Agents number

validateNumber(control: AbstractControl): ValidationErrors | null {
  if (isNaN(control.value)) {
    return { 'notANumber': true };
  }
  return null;
}




}
