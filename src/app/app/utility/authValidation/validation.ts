import { FormGroup } from "@angular/forms";
export class pwdvalidation {
    
    static pwdMatchValidator(password:any,confirm_password:any){
        return(formGroup: FormGroup)=>{
          const pwdcontrol=formGroup.controls[password];
          const confirm_passwordcontrol=formGroup.controls[confirm_password];
          if(confirm_passwordcontrol.errors && !confirm_passwordcontrol.errors['matchpassword']){ 
            return;
          }
          if(pwdcontrol.value !== confirm_passwordcontrol.value){
            confirm_passwordcontrol.setErrors({matchpassword:true});
          }
          else{
             confirm_passwordcontrol.setErrors(null);
            }
        };
    }
}