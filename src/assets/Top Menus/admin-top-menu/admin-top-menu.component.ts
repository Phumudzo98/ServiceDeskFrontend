import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-top-menu',
  templateUrl: './admin-top-menu.component.html',
  styleUrls: ['./admin-top-menu.component.css']
})
export class AdminTopMenuComponent {
  
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  notificationVisible = false;
  message = "Notification Message";

  toggleNotification() {
    this.notificationVisible = !this.notificationVisible;
  }

}
