import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})



export class CompanyRegisterComponent {


  loginForm: FormGroup;
  companyRegisterForm: FormGroup;
    
  constructor(private router:Router, formBuilder: FormBuilder) {
  
    this.loginForm = formBuilder.group({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

      email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    
    });

    this.companyRegisterForm = formBuilder.group({
      password: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      confirm_password: new FormControl('',  [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      companyEmail: new FormControl('', [Validators.email, Validators.required]),
    },{
      validators: this.MustMatch('password', 'confirm_password'),
    })
  }
 
 
  get register (){return this.loginForm.controls;}
  get company(){return this.companyRegisterForm.controls}

  //Submitting the company form
  currentForm: string = 'form1';
  
  isLoading: boolean = false;

  toggleForms() {
    this.isLoading = true;
    setTimeout(() => {
        
        this.isLoading = false;
        if (this.currentForm !== 'form2') {
            this.switchToForm('form2');
        }
    }, 5000);
}

switchToForm(form: string) {
    this.currentForm = form;
    console.log(`Switching to ${form}`);
}

  
  
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



   



