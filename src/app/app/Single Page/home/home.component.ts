import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private el: ElementRef) { }

  contactForm: FormGroup = new FormGroup({
    fullName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    subject: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required),
  })

  get contact (){return this.contactForm.controls;}


  /*Scroll to About*/
  
  scrollToAboutUs(): void {
    const aboutUsSection = this.el.nativeElement.querySelector('#aboutUs');
    aboutUsSection.scrollIntoView({ behavior: 'smooth' });
  }

  /*Scroll to Services*/
  
  scrollToServices(): void {
    const aboutUsSection = this.el.nativeElement.querySelector('#service');
    aboutUsSection.scrollIntoView({ behavior: 'smooth' });
  }

  /*Scroll to Pricing*/
  
  scrollToPricing(): void {
    const aboutUsSection = this.el.nativeElement.querySelector('#pricing');
    aboutUsSection.scrollIntoView({ behavior: 'smooth' });
  }

  /*Scroll to Contact Us*/
  
  scrollToContactUs(): void {
    const aboutUsSection = this.el.nativeElement.querySelector('#contactUs');
    aboutUsSection.scrollIntoView({ behavior: 'smooth' });
  }

  submitForm() {
    
  }

}
