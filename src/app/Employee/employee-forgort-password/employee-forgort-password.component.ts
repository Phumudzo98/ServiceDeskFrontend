import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-forgort-password',
  templateUrl: './employee-forgort-password.component.html',
  styleUrls: ['./employee-forgort-password.component.css']
})
export class EmployeeForgortPasswordComponent {

  forget_Password_Form: any;
  responseMessage: any;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  constructor(private router:Router, private http: HttpClient) {
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
  sendEmail() {
    this.showSpinner = true;

  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'skip': 'true'
    });

    const apiUrl = 'http://localhost:8080/api/auth/forgotPassword';
    this.http.post<{ message: string }>(apiUrl, this.forgetForm.value, { headers }).subscribe(
      response => {
        this.responseMessage = response.message;
        console.log('Email sent successfully:', response.message);
        // Handle success, e.g., show a success message to the user
 this.showAlertMessage( 'success',this.responseMessage = response.message)
      },
      error => {
        console.error('Error sending email:', error);
        this.responseMessage = error.error.message || 'An error occurred';
        console.log( this.responseMessage = error.error.message);
        // Handle error, e.g., show an error message to the user
        this.showAlertMessage( 'error',this.responseMessage = error.error.message)
      }
    ).add(() => {
     
        this.showSpinner = false;
    
    });
  }


  
  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000); //disable the message after 2 seconds 
  }
}


