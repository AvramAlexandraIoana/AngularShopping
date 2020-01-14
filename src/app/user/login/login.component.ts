import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { HttpClient } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';
import { NavMenuComponent } from 'src/app/nav-menu/nav-menu.component';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  Users = [];
  submitted = false;
  isValidUser = false;
  baseUrl : string
  constructor(private formBuilder: FormBuilder, private request: MainService, private router: Router, private navbar : NavMenuComponent, private toastr: ToastrService) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/users.json";
    this.Users = this.getUsers();
    console.log(this.Users);

    
  }
  get f() { return this.loginForm.controls; }

  login(user: {email : string, password: string}) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }
    for ( var i = 0; i < this.Users.length; i++){
      if ( this.Users[i].email == user.email && this.Users[i].password == user.password ) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(["product-list"]);
        this.toastr.success('Login successful.');

        return;
      } 
    }
    this.toastr.error('Incorrect username or password.', 'Authentication failed.');

  }

  getUsers()  {
    return this.request.get(this.baseUrl);
  }

}
