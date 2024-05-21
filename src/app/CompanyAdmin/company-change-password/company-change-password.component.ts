import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } 
from '@angular/forms';



import { Router } from '@angular/router';
@Component({
  selector: 'app-company-change-password',
  templateUrl: './company-change-password.component.html',
  styleUrls: ['./company-change-password.component.css']
})
export class CompanyChangePasswordComponent {
  constructor(private fb: FormBuilder) {}

  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirm_password: ['', [Validators.required]],
  }, 
  
  { validators: this.MustMatch('password', 'confirm_password') });

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

    get password (){return this.passwordForm.controls;}

}

