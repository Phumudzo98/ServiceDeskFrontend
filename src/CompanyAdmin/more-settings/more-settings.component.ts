import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-settings',
  templateUrl: './more-settings.component.html',
  styleUrls: ['./more-settings.component.css']
})
export class MoreSettingsComponent {

  constructor(private router: Router){}

  primaryColor: string = '#fff'; // Default color
  secondaryColor: string = '#fff'; 

  

 
 
  logoImage: any = 'assets/images/Icon.png'; 



     //Active and nin active content
     currentForm: string = 'form1';
   
     toggleForms(form: string) {
       this.currentForm = form;
     }

  

    //Image and Displaying
    
    
imageUrl!: string | ArrayBuffer | null;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    this.logoImage = reader.result as string | ArrayBuffer; 
     };
  }
}

toDestination(){
  this.router.navigate(['/company-subscription']);
}
}