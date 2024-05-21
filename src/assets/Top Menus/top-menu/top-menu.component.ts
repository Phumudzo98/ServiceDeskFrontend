import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {

  showDropdown: boolean = false;
  lastName: string='';
  expiredToken: any;
  profileImage: any ;
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  notificationVisible = false;
  message = "Notification Message";

  toggleNotification() {
    this.notificationVisible = !this.notificationVisible;
  }

  logoImage: string | ArrayBuffer | null = 'assets/images/Ellipse 73.svg'; 
onFileSelected(event: any) 
{
const file: File = event.target.files[0];
if (file) {
 const reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = () => {
 this.logoImage = reader.result as string | ArrayBuffer; 
   };
}
}
authToken!: any;
token!: any;
sub!: string;
email:string='';
constructor(private http: HttpClient) { }
ngOnInit(): void {
  this.authToken = sessionStorage.getItem('auth-user');
  if (this.authToken) {
    this.token = jwt_decode(this.authToken);
    this.extractName();
    this.extractEmail();
    this.extractExpTokenTime();
  }
}

private extractName() {
  if (this.token && this.token.hasOwnProperty('lastName')) {
    this.lastName = this.token.lastName;
  } else {
    // Handle error or default value if company name is not present in the token
    this.sub = 'Default Company Name';
  }
}

private extractEmail() {
  if (this.token && this.token.hasOwnProperty('email')) {
    this.email = this.token.email;
     // Fetch the user's profile picture
     this.fetchProfilePictureByEmail(this.email);
  } else {
    // Handle error or default value if email is not present in the token
    this.email = 'Default Email';
  }
}

private extractExpTokenTime() {
  if (this.token && this.token.hasOwnProperty('exp')) {
    const expTimestamp = this.token.exp * 1000; // Convert UNIX timestamp to milliseconds
    const expDate = new Date(expTimestamp);
    const currentTime = new Date();
    const timeUntilExpiry = expDate.getTime() - currentTime.getTime();
    console.log(expTimestamp);
    console.log(currentTime);
    console.log(timeUntilExpiry);
    // Set up a timer to logout when the token expires
    setTimeout(() => {
      this.logout(); // Call logout function when token expires
    }, timeUntilExpiry);
  } else {
    // Handle error or default value if exp is not present in the token
    this.expiredToken = 'Default Token';
  }
}

fetchProfilePictureByEmail(email: string) {
  this.http.get('http://localhost:8080/api/users/displayProfileImage', {
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
logout():void{

this.http.post<any>('http://localhost:8080/api/company/logout/'+this.email, {}).subscribe(response => {
  // Handle logout success
  console.log('Logged out successfully');
},error => {
  // Handle logout error
  console.error('Error logging out:', error);
});
sessionStorage.clear();
}
  
}
