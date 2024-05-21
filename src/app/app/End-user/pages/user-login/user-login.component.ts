import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/utility/models/models';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  login = new Login();
  info!:any;
  constructor(private router:Router) {
  }
  loginForm = new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });
  get v () {
    return this.loginForm.controls;
  }
  
  ngOnInit(): void {
  }
  /*loggingIn(): void {
    this.login=Object.assign(this.login,this.loginForm.value)
    this.authservice.login(this.login).subscribe({
      next:data => {this.info=data;
      this.storageserv.setItem(this.info.jwt,''); /*??????/*/
   /* this.router.navigateByUrl('/userhomepage');}
    })  
  }*/
}

