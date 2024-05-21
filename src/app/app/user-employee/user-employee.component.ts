import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
interface UserRegistrationData {
  fullName: string;
  email: string;
  contactNumber: string;
  lastName: string;
  position: string;
  role: string;
}
@Component({
  selector: 'app-user-employee',
  templateUrl: './user-employee.component.html',
  styleUrls: ['./user-employee.component.css']
})
export class UserEmployeeComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();
  submittingForm: boolean = false;
  defaultDesignation = 'Select Designation';
  companyId: string="";
  alertType: any;
  alertMessage: any;
  showAlert: boolean | undefined;
  email: string="";
  
  constructor(private fb: FormBuilder,private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.authToken = sessionStorage.getItem('auth-user');
    if (this.authToken) {
      this.token = jwt_decode(this.authToken);
      this.extractCompanyId(); // Call the method to extract companyId
      this.extractEmail(); // Call the method to extract email
    }
  
  }

  private extractCompanyId() {
    if (this.token && this.token.hasOwnProperty('companyId')) {
      this.companyId = this.token.companyId;
    
    } else {
      // Handle error or default value if companyId is not present in the token
      this.companyId = 'Default Company ID';
    }
  
  }
  private extractEmail() {
    if (this.token && this.token.hasOwnProperty('email')) {
      this.email = this.token.email;
    } else {
      // Handle error or default value if email is not present in the token
      this.email = 'Default Email';
    }
  }
 

  //Closing the window
  closeWindow() {
    this.close.emit();
  }
//Adding a User form
add_user_form: FormGroup[] = [new FormGroup({
  //fullName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
  firstName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
  lastName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
  designation: new FormControl('',[Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

  //status: new FormControl('', Validators.required),
  department: new FormControl('', Validators.required),
  })];
 
  get add (){return this.add_user_form[0].controls;}

  
  //Validating Agents number

validateNumber(control: AbstractControl): ValidationErrors | null {
  if (isNaN(control.value)) {
    return { 'notANumber': true };
  }
  return null;
}
  
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
  
  //Adding a user/Employee
  
  showSpinner: boolean = false;
  userAdded: boolean = false;
  successMessage: string = '';

  // Your form initialization and other existing code...
  authToken!: any;
  token!: any;
  companyName!: string;
 


  private data: any;

  storeUser(): any {
    this.showSpinner = true; // Set submittingForm flag to true
    const userData: UserRegistrationData = {
      fullName: this.add_user_form[0].value.firstName,
      email: this.add_user_form[0].value.email,
      contactNumber: this.add_user_form[0].value.phone_number,
      role: this.add_user_form[0].value.designation,
      lastName: this.add_user_form[0].value.lastName,
      position: this.add_user_form[0].value.department,
    };
  
    this.http.post<any>('http://localhost:8080/api/users/register-users/' + this.companyId, [userData]).subscribe(
      response => {
        if (response.successful === 1) {
          console.log('User added successfully:', response.users);
          this.showAlertMessage('success', 'Employee or Agent Successfully added');
        } else if (response.failed === 1) {
          console.log('Failed to add user:', response.failedAccounts);
          this.showAlertMessage('error', 'Failed to add Employee or Agent');
        } else {
          console.log('Unexpected response:', response);
        }
      },
      error => {
        console.error('Error adding user:', error);
        // Handle error response if needed
        console.log(userData);
        this.showAlertMessage('error', 'Failed to add Employee or Agent');
      }
    ).add(() => {
      this.showSpinner= false; // Set submittingForm flag to false when request completes
    });
  }
 
 

    showAlertMessage(type: string, message: string) {
      this.alertType = type;
      this.alertMessage = message;
      this.showAlert = true;
  
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
}


 


