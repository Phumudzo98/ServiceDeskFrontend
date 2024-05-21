import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent {
  loginForm: FormGroup;
    
  constructor(private router:Router, formBuilder: FormBuilder) {
  
    this.loginForm = formBuilder.group({
      email: new FormControl('phumu98@gmail.com',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      password: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      confirm_password: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  
  
    },
    {
      validators: this.MustMatch('password', 'confirm_password')
    });
  }
 
 
  get register (){return this.loginForm.controls;}

   /*Password mismatched*/
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


}
