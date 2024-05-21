import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-forgort-password',
  templateUrl: './employee-forgort-password.component.html',
  styleUrls: ['./employee-forgort-password.component.css']
})
export class EmployeeForgortPasswordComponent {
  constructor(private router:Router) {
  }
  forgetForm= new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
  });
  get forgot (){return this. forgetForm.controls;}

}
