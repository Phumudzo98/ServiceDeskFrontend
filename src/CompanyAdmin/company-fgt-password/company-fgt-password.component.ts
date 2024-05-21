import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-fgt-password',
  templateUrl: './company-fgt-password.component.html',
  styleUrls: ['./company-fgt-password.component.css']
})
export class CompanyFgtPasswordComponent {

  constructor(private router:Router) {
  }
  forget_Password_Form: FormGroup = new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
  });
  get change_password (){return this.forget_Password_Form.controls;}

  showSpinner: boolean = false;

  // Sign-in method
  passwordReset() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

}
