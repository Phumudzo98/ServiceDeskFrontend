import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-fgt-password',
  templateUrl: './admin-fgt-password.component.html',
  styleUrls: ['./admin-fgt-password.component.css']
})
export class AdminFgtPasswordComponent {

  constructor(private router:Router) {
  }
  forgetForm= new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
  });
  get forgot (){return this. forgetForm.controls;}
  				   
  showSpinner: boolean = false;

  // Change password method
  passwordReset() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }
}
