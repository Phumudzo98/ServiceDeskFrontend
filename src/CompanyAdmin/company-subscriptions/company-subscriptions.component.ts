import { Component } from '@angular/core';

@Component({
  selector: 'app-company-subscriptions',
  templateUrl: './company-subscriptions.component.html',
  styleUrls: ['./company-subscriptions.component.css']
})
export class CompanySubscriptionsComponent {

  packageFree: string='Free';
  packageEssentials: string='Essentials';
  packageTeam: string='Team';
  packageEnterprise: string='Enterprise';

  currentPackage: string = this.packageFree; // We will replace this.packageFree with the license a company currently have
}
  

