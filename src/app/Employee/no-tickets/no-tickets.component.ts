import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-tickets',
  templateUrl: './no-tickets.component.html',
  styleUrls: ['./no-tickets.component.css']
})
export class NoTicketsComponent {


  ticketForm:FormGroup = new FormGroup({

    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    type: new FormControl('',[Validators.required]),
    priority_status: new FormControl ('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required])

  })

  get new_ticket (){return this.ticketForm.controls;}


    //Dropdown on an action Icon
 
    isDropdownOpen: boolean = false;

    toggleDropdown(event: Event): void {
        event.stopPropagation(); // Prevents the event from bubbling up to parent elements
        this.isDropdownOpen = !this.isDropdownOpen;
    }
}
