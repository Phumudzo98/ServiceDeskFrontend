import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  currentPackage: string = 'free'; // Default package is 'free'

  constructor() { }

  upgradePackage(newPackage: string) {
    if (this.canUpgrade(newPackage)) {
      this.currentPackage = newPackage;
    } else {
      console.error("Cannot upgrade to this package.");
    }
  }

  downgradePackage(newPackage: string) {
    if (this.canDowngrade(newPackage)) {
      this.currentPackage = newPackage;
    } else {
      console.error("Cannot downgrade to this package.");
    }
  }

  canUpgrade(newPackage: string): boolean {
    const packageOrder = ['free', 'essentials', 'team', 'enterprise'];
    return packageOrder.indexOf(this.currentPackage) <= packageOrder.indexOf(newPackage);
  }

  canDowngrade(newPackage: string): boolean {
    const packageOrder = ['free', 'essentials', 'team', 'enterprise'];
    return packageOrder.indexOf(this.currentPackage) >= packageOrder.indexOf(newPackage);
  }
}
