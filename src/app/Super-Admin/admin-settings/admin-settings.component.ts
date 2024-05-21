import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent {

  constructor(private fb: FormBuilder) {}

  

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('Phumudzo ', [Validators.required, this.noNumbersValidator()]),
    lastName: new FormControl(' Tshivhase', [Validators.required, this.noNumbersValidator()]),
    email: new FormControl('Phumu98@gmail.com', [Validators.required, Validators.email]),
    });

    
  //Change Password Form

  passwordForm: FormGroup = this.fb.group({
    old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
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
    
    //Save Changes spinner
    showSpinner: boolean = false;
    successMessage: string = '';

    saveChanges() {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.successMessage = 'Profile details changed successfully!'; 
        setTimeout(() => {
          this.successMessage = ''; 
        }, 3000);
      }, 5000);
    }

    changesPassword(){
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
        this.successMessage = 'Password changed successfully!'; 
        this.passwordForm.reset(); 
        setTimeout(() => {
          this.successMessage = ''; 
        }, 3000);
      }, 5000);
    }
    onFileSelected(event: any) {
      const selectedFile = event.target.files[0];
      //console.log(selectedFile); Do something with the selected file
    }
  
     
  
    get profile (){return this.profileForm.controls;}
    get password (){return this.passwordForm.controls;}


}
