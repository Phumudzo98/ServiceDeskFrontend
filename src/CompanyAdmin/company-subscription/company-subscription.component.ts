import { Component } from '@angular/core';

@Component({
  selector: 'app-company-subscription',
  templateUrl: './company-subscription.component.html',
  styleUrls: ['./company-subscription.component.css']
})
export class CompanySubscriptionComponent {
  packageFree: string='Free';
  packageEssentials: string='Essentials';
  packageTeam: string='Team';
  packageEnterprise: string='Enterprise';

  currentPackage: string = this.packageEssentials; // We will replace this.packageFree with the license a company currently have
}
