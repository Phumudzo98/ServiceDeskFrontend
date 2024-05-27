import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agent-ticket-details',
  templateUrl: './agent-ticket-details.component.html',
  styleUrls: ['./agent-ticket-details.component.css']
})
export class AgentTicketDetailsComponent {
  constructor(private router: Router) { }

  //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }
}
