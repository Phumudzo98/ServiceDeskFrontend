import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    
  constructor(private router:Router, formBuilder: FormBuilder, private http: HttpClient) {
  
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
    }, 3000);
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

   

   submitForm():void
   {

    let url="http://localhost:8080/api/auth/signup"

    if(this.loginForm && this.companyRegisterForm)
      {
        const formData={
          "companyName":this.companyRegisterForm.get('companyName')?.value,
          "companyEmail":this.companyRegisterForm.get('companyEmail')?.value,
          "contactNumber":this.loginForm.get('contactNumber')?.value,
          "password":this.companyRegisterForm.get('password')?.value,


          "fullName":this.loginForm.get('firstName')?.value,
          "email":this.loginForm.get('email')?.value,
          "adminContactNumber":this.loginForm.get('contactNumber')?.value,
          "lastName":this.loginForm.get('lastName')?.value,
          "position":"Admin",
          "adminPassword":this.companyRegisterForm.get('password')?.value

        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
          'skip': 'true'
        });

        this.http.post<any>(url, formData, {headers}).subscribe(response=>{
          console.log("successful");
          this.router.navigate(['/company-login'])
        }
      ,error=>{
        console.log("Somthing went wrong");
        
      })
        
      }

      

   }
   
   signUp()
   {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
   }

   
   
}



   



