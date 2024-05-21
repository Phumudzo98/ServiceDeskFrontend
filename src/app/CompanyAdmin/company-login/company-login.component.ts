import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';


@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;

  
  constructor(private router: Router,private http: HttpClient,private storageService: StorageService) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    password: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  });
  get login (){return this.loginForm.controls;}

  authToken!: any;
  isLoggedIn: boolean = false;
  //ngOnInit(): void {
   // if (this.storageService.isLoggedIn()) {
     //// this.isLoggedIn = true;
      //this.router.navigate(['/company-dashboard']);
   // }
  //}

  private loginUrl = 'http://localhost:8080/api/auth/login';

  // Flag to track form submission
  submittingForm: boolean = false;
 loginUser() {
  this.submittingForm = true; // Set submittingForm flag to true
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
      'skip': 'true'
    });

    if (this.loginForm.valid) {
      this.http.post<any>(this.loginUrl, this.loginForm.value, { headers })
        .subscribe((response: any) => {
          console.log('Login response:', response);
          this.showAlertMessage('success', 'Logged in successfully');
          setTimeout(() => {
            this.authToken = response;
            this.storageService.saveUser(this.authToken.message);
           ///this.isLoggedIn = true;
           this.router.navigate(['/company-dashboard']);
          }, 2000);
        }, (error: HttpErrorResponse) => {
          console.error('Error logging in:', error);
          let errorMessage = 'Sorry, something went wrong.';
          if (error.status === 401) {
            errorMessage = 'Invalid email or password.';
          } else if (error.status === 0) {
            errorMessage = 'Network error. Please check your internet connection.';
          }
          this.showAlertMessage('error', errorMessage);
        }).add(() => {
          this.submittingForm = false; // Set submittingForm flag to false when request completes
        });
    } else {
      console.log('Form data is invalid. Please check the fields.');
    }
  }


  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2000); //disable the message after 2 seconds 
  }
  
}
