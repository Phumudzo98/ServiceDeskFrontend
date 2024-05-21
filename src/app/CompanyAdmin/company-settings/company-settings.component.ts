import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/services/auth.service';
import jwt_decode from 'jwt-decode';

interface UserRegistrationData {
  fullName: string;
  email: string;
  contactNumber: string;
  lastName: string;
  position: string;
  role: string;
}
declare var $: any; // Declare jQuery
@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent {

  companyId: string="";
  apiUrl:string ="";
  agents: any[] = []; // Define the agents array to hold the data
  loadings = true; // Flag to track loading state
 
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
  searchQuery: string = ''; // Define searchQuery property
  position: string ='';
  
  constructor(private fb: FormBuilder,private http: HttpClient, private formBuilder: FormBuilder,
    private authService: AuthService) {}

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

      this.getAllAgents();
      this.getAllUsers();
    // Initialize buttonText for each agent
  this.agents.forEach(agent => {
    agent.buttonText = agent.statusAgent === 'Active' ? 'Disable' : 'Enable';
    agent.defaultButtonText = agent.statusAgent === 'Active' ? 'Disable' : 'Enable'; // Store the default button text
  });

   // Initialize buttonText for each User
   this.users.forEach(user => {
    user.buttonText = user.statusAgent === 'Active' ? 'Disable' : 'Enable';
    user.defaultButtonText = user.statusAgent === 'Active' ? 'Disable' : 'Enable'; // Store the default button text
  });

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
        this.firstName = 'Default Email';
      }
    }
    private extractLastName() {
      if (this.token && this.token.hasOwnProperty('lastName')) {
        this.lastName = this.token.lastName;
      } else {
        // Handle error or default value if email is not present in the token
        this.lastName= 'Default Email';
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
      old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirm_password: ['', [Validators.required]],
    }, { validators: this.MustMatch('new_password', 'confirm_password') });
  
//Adding a User form
  add_user_form: FormGroup[] = [new FormGroup({
    //fullName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    firstName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    lastName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    designation: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

    //status: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),

      

    })];

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
  currentForm1: string = 'form6';
     //Active and nin active content
     currentForm: string = 'form1';
  
     toggleForms(form: string) {
       this.currentForm = form;
     }

 

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

    //Save Changes spinner
    showSpinner: boolean = false;
    saveChanges() {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }


    //Add Agent/Employee
    addUsers() {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }
     //Button to select

     selectedFileName: string = ''; // Initialize selectedFileName

     onFileSelected(event: any) {
         const file = event.target.files[0];
         if (file) {
             this.selectedFileName = file.name; // Set selectedFileName to the file name
             this.file = file; // Assign the selected file to this.file for FormData
         }
     }
  
  buttonTexts: string[] = ['On', 'On', 'On', 'On', 'On','On','On','On']; 
  isOns: boolean[] = [true, true, true, true, true, true, true, true]; 
  
  toggleState(index: number) {
    this.isOns[index] = !this.isOns[index];
    this.buttonTexts[index] = this.isOns[index] ? 'On' : 'Off';
  }

  //Restore to default button
  restoreToDefault() {
    this.isOns = this.isOns.map(() => false);
    this.buttonTexts = this.isOns.map(() => 'On'); 
  }


 //Deactivating
 isDropdownOpen: boolean[] = []; // Assuming there are three dropdowns
isDeactivating: boolean = false;
loading: boolean = false;
buttonText: string = 'Disable'; 
isButtonDisabled: boolean = false;

toggleDropdown(agent: any) {
  const agentIndex = this.agents.indexOf(agent);
  if (agentIndex !== -1) {
    this.isDropdownOpen[agentIndex] = !this.isDropdownOpen[agentIndex];
  }
}
toggleDropdown1(user: any) {
  const userIndex = this.users.indexOf(user);
  if (userIndex !== -1) {
    this.isDropdownOpen[userIndex] = !this.isDropdownOpen[userIndex];
  }
}
isConfirmingDeactivation: boolean = false;


addVisible: boolean = false;
toggleAddForms() {
  this.addVisible = !this.addVisible;
}
// Initialize buttonText based on the status


confirmDeactivation(agent: any) {
  const agentIndex = this.agents.indexOf(agent);
  if (agentIndex !== -1) {
    this.isConfirmingDeactivation = true;
    this.showSpinner = true; // Set loading to true for the main process

    // Set loading specifically for this button
    this.agents[agentIndex].showSpinner = true;

    setTimeout(() => {
      // Toggle the status for the specific agent
      this.agents[agentIndex].statusAgent = this.agents[agentIndex].statusAgent === 'Active' ? 'Disabled' : 'Active';
      // Update the buttonText based on the updated status
      this.agents[agentIndex].buttonText = this.agents[agentIndex].statusAgent === 'Active' ? 'Disable' : 'Enable';

      // Send the request to update the agent status on the backend
      this.http.post<any>('http://localhost:8080/api/users/changeAgentStatus', { email: agent.email, statusAgent: this.agents[agentIndex].statusAgent })
        .subscribe(
          (response) => {
            // Handle response if needed
          },
          (error) => {
            console.error('Error updating agent status:', error);
            // Handle error if needed
          }
        ).add(() => {
          // Set loading to false for the main process after the request completes
          this.showSpinner= false;
          // Set loading to false specifically for this button
          this.agents[agentIndex].showSpinner = false;
        });

      this.isDeactivating = !this.isDeactivating;
      this.isConfirmingDeactivation = false;

      this.closeDropdown(agent);
    }, 2000);
  }
}
confirmDeactivation2(user: any) {
  const userIndex = this.users.indexOf(user);
  if (userIndex !== -1) {
    this.isConfirmingDeactivation = true;
    this.showSpinner = true; // Set loading to true for the main process

    // Set loading specifically for this button
    this.users[userIndex].showSpinner= true;

    setTimeout(() => {
      // Toggle the status for the specific agent
      this.users[userIndex].statusAgent = this.users[userIndex].statusAgent === 'Active' ? 'Disabled' : 'Active';
      // Update the buttonText based on the updated status
      this.users[userIndex].buttonText = this.users[userIndex].statusAgent === 'Active' ? 'Disable' : 'Enable';

      // Send the request to update the agent status on the backend
      this.http.post<any>('http://localhost:8080/api/users/changeUserStatus', { email: user.email, statusAgent: this.agents[userIndex].statusAgent })
        .subscribe(
          (response) => {
            // Handle response if needed
          },
          (error) => {
            console.error('Error updating agent status:', error);
            // Handle error if needed
          }
        ).add(() => {
          // Set loading to false for the main process after the request completes
          this.showSpinner = false;
          // Set loading to false specifically for this button
          this.users[userIndex].showSpinner = false;
        });

      this.isDeactivating = !this.isDeactivating;
      this.isConfirmingDeactivation = false;

      this.closeDropdown1(user);
    }, 2000);
  }
}


resetButtonText(agentIndex: number) {
  setTimeout(() => {
    this.agents[agentIndex].buttonText = this.agents[agentIndex].defaultButtonText; // Reset buttonText to default value
  }, 5000); // Adjust the timeout value as needed
}

 closeDropdown(agent: any) {
    const agentIndex = this.agents.indexOf(agent);
    if (agentIndex !== -1) {
      this.isDropdownOpen[agentIndex] = false;
    }
  }
  closeDropdown1(user: any) {
    this.isDropdownOpen[this.users.indexOf(user)] = false;
  }
  
    get profile (){return this.profileForm.controls;}
    get password (){return this.passwordForm.controls;}
    get add (){return this.add_user_form[0].controls;}

    authToken!: any;
    token!: any;
    companyName!: string;
   
  
    getAllAgents() {
      this.http.get<any[]>('http://localhost:8080/api/users/get-agents/'+this.companyId).subscribe(
        (data) => {
          this.agents = data;
          this.loadings = false; // Set loading to false once data is fetched

           // Set buttonText based on agent status
      this.agents.forEach(agent => {
        agent.buttonText = agent.statusAgent === 'Active' ? 'Disable' : 'Enable';
      });
          console.log(this.agents)
        },
        (error) => {
          console.error('Error fetching agents:', error);
          this.loadings = false; // Set loading to false on error as well
        }
      );
    }
    getAllUsers() {
      this.http.get<any[]>('http://localhost:8080/api/users/all-users/'+this.companyId).subscribe(
        (data) => {
          this.users = data;
          this.loadings = false; // Set loading to false once data is fetched

           // Set buttonText based on agent status
      this.users.forEach(user => {
        user.buttonText = user.statusAgent === 'Active' ? 'Disable' : 'Enable';
      });
          console.log(this.users)
        
        },
        (error) => {
          console.error('Error fetching agents:', error);
          this.loadings = false; // Set loading to false on error as well
        }
      );
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
   fetchProfilePictureByEmail(email: string) {
    this.http.get('http://localhost:8080/api/company/displayProfileImage', {
      responseType: 'blob',
      params: { email: this.email },
    }).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(response);
      },
      error => {
        console.error('Error fetching profile image:', error);
      }
    );
  }

  updateProfile() {
    this.showSpinner = true; // Show the spinner initially
  
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('fullName', this.profileForm.value.firstName);
    formData.append('lastName', this.profileForm.value.lastName);
    formData.append('email', this.profileForm.value.email);
    formData.append('position',this.profileForm.value.Department)
    this.http.post<any>('http://localhost:8080/api/company/updateProfile', formData).subscribe(
      response => {
        console.log('Response from server:', response);
        this.showAlertMessage('success', response.message);
        const token = response.token;
        this.showSpinner = false; // Hide the spinner when the request completes
        sessionStorage.setItem('auth-user',token)
        window.location.reload(); // Refresh the page
      },
      error => {
        console.error('Error updating profile:', error);
        this.showAlertMessage('error', 'Sorry, please verify all the fields');
        this.showSpinner = false; // Hide the spinner when the request encounters an error
      }
    );
  }
  performSearchAgent(): void {
    if (this.searchQuery.trim() === '') {
      this.getAllAgents(); // Reset to show all agents if search query is empty
    } else {
      this.agents = this.agents.filter(agent =>
        (agent.fullName && agent.fullName.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (agent.lastName && agent.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (agent.position && agent.position.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (agent.statusAgent && agent.statusAgent.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }
  performSearchUser(): void {
    if (this.searchQuery.trim() === '') {
      this.getAllUsers(); // Reset to show all agents if search query is empty
    } else {
      this.users = this.users.filter(user =>
        (user.fullName && user.fullName.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (user.position && user.position.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (user.statusAgent && user.statusAgent.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
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

