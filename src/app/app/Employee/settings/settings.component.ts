import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/services/auth.service';
import jwt_decode from 'jwt-decode';
import { AuthAgentUserService } from 'src/app/utility/services/auth-agent-user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  email:string="";
  newPassword: string = '';
  error!: string;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  submittingForm: boolean = false;
  users: any[]=[];
  failedAccounts: any;
  file!: File;
  oldPassword: string = '';
  firstName: string='';
  lastName: string='';
  profileForm!: FormGroup;
  profileImage: string | ArrayBuffer | null | undefined;
  authToken!: any;
  token!: any;
  companyId: string ="";
  //Save Changes spinner
  showSpinner: boolean = false;
  position: string ="";

  constructor(private fb: FormBuilder,private http: HttpClient, private formBuilder: FormBuilder,
    private authService:AuthAgentUserService) {}

  ngOnInit(): void {
    this.authToken = sessionStorage.getItem('auth-user');
    if (this.authToken) {
      this.token = jwt_decode(this.authToken);
      this.extractCompanyId(); // Call the method to extract companyId
      this.extractEmail(); // Call the method to extract email
      this.extractFirstName();
      this.extractLastName();
      this.extractPosition();
    }

 // Initialize profileForm with default values
 this.profileForm = new FormGroup({
  firstName: new FormControl(this.firstName, [Validators.required, this.noNumbersValidator()]),
  lastName: new FormControl(this.lastName, [Validators.required, this.noNumbersValidator()]),
  email: new FormControl(this.email, [Validators.required, Validators.email]),
  Department: new FormControl(this.position,[Validators.required]),
  file: new FormControl(''),
});
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
  private extractFirstName() {
    if (this.token && this.token.hasOwnProperty('firstName')) {
      this.firstName = this.token.firstName;
    } else {
      // Handle error or default value if email is not present in the token
      this.firstName = 'Default FirstName';
    }
  }
  private extractLastName() {
    if (this.token && this.token.hasOwnProperty('lastName')) {
      this.lastName = this.token.lastName;
    } else {
      
      this.lastName= 'Default LastName';
    }
  }
private extractPosition(){
  if (this.token && this.token.hasOwnProperty('position')) {
    this.position = this.token.position;
  } else {
    
    this.position= 'Default position';
  }
}
  //Change Password Form

  passwordForm: FormGroup = this.fb.group({
    email: [this.email, [Validators.email]],
    old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirm_password: ['', [Validators.required]],
  }, { validators: this.MustMatch('new_password', 'confirm_password') });

  //comfirm password
  MustMatch( password:any, confirm_password:any)
  {
   return(formGroup: FormGroup)=>{
     const passwordcontrol = formGroup.controls[password];
     const confirm_passwordcontrol = formGroup.controls[confirm_password];

     if(confirm_passwordcontrol.errors && !confirm_passwordcontrol.errors['MustMatch']){
       return;
     }
     if(passwordcontrol.value !== confirm_passwordcontrol.value)
     {
       confirm_passwordcontrol.setErrors({'MustMatch': true});
     }
     else{
       confirm_passwordcontrol.setErrors(null);
     }

   }
  }

   //Active and nin active content
   currentForm: string = 'form1';

   toggleForms(form: string) {
     this.currentForm = form;
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
  notificationVisible = false;
  message = "Notification Message";

  toggleNotification() {
    this.notificationVisible = !this.notificationVisible;
  }
  buttonText: string = 'On';
  isOn: boolean = true;
  toggleState() {
    this.isOn = !this.isOn;
    this.buttonText = this.isOn ? 'On' : 'Off';
  }
   

  get profile (){return this.profileForm.controls;}
  get password (){return this.passwordForm.controls;}
  selectedFileName: string = ''; // Initialize selectedFileName

  onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
          this.selectedFileName = file.name; // Set selectedFileName to the file name
          this.file = file; // Assign the selected file to this.file for FormData
      }
  }
  resetPassword() {

    this.showSpinner = true; // Set submittingForm flag to true
    // Get the value of the oldpassword field from the form
 const oldPasswordValue = this.passwordForm.get('old_password')?.value;
   this.authService.verifyOldPassword(this.email, oldPasswordValue)
     .subscribe(
       (response) => {
         console.log(this.email)
         console.log(this.oldPassword)
         this.changePassword();

       },
       (error) => {
         console.error('Error verifying old password:', error);
         console.log(this.email)
         console.log(this.oldPassword)
         this.error = 'Old password is incorrect.';
         this.showAlertMessage('error', 'Old password is incorrect.');
       }
     ).add(() => {
      this.showSpinner = false; // Set submittingForm flag to false when request completes
    });;
 }

 changePassword() {
  this.showSpinner= true; // Set submittingForm flag to true
   const PasswordValue = this.passwordForm.get('new_password')?.value;
   this.authService.changePassword(this.email, PasswordValue)
     .subscribe(
       (response: any) => {
         
         console.log('Password changed successfully:', response);
         this.showAlertMessage('success', 'Password changed successfully');
         this.profileForm.reset();
       },
       (error: any) => {
         console.error('Error changing password:', error);
         this.error = 'Error changing password. Please try again later.';
         this.showAlertMessage('error', 'Error changing password. Please try again later.');
       }
     ).add(() => {
      this.showSpinner= false; // Set submittingForm flag to false when request completes
    });;
 }

 updateProfile() {
  this.showSpinner = true; // Show the spinner initially

  const formData = new FormData();
  formData.append('file', this.file);
  formData.append('fullName', this.profileForm.value.firstName);
  formData.append('lastName', this.profileForm.value.lastName);
  formData.append('email', this.profileForm.value.email);
  formData.append('position',this.profileForm.value.Department);

  this.http.post<any>('http://localhost:8080/api/users/updateProfile', formData).subscribe(
    response => {
      const token = response.token;
      setTimeout(() => {
        this.showSpinner = false; // Hide the spinner when the request completes
        sessionStorage.setItem('auth-user', token);
      }, 3000);

      setTimeout(() => {
        console.log('Response from server:', response);
        this.showAlertMessage('success', response.message);
        window.location.reload();
      }, 5000); // Adjust this timeout to be after the spinner hide timeout
    },
    error => {
      console.error('Error updating profile:', error);
      this.showAlertMessage('error', 'Sorry, please verify all the fields');
      this.showSpinner = false; // Hide the spinner when the request encounters an error
    }
  );
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
