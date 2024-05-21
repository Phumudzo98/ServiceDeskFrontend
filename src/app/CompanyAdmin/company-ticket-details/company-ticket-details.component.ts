import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-ticket-details',
  templateUrl: './company-ticket-details.component.html',
  styleUrls: ['./company-ticket-details.component.css']
})
export class CompanyTicketDetailsComponent {

  constructor(private router: Router) { }

  navigateToDestination() {
      this.router.navigate(['/employee-tickets']);
  }

  //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }
}
