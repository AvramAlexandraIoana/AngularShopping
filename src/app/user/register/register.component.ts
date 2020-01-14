import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/services/main.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loadedUsers = [];
  baseUrl : string;

  constructor(private router: Router, private formBuilder: FormBuilder, private request: MainService, private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]

    
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/users.json";
  }



  register(userData: { name: string; email: string , password: string, confirmPassword: string}) {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }
    this.toastr.success('New user created!', 'Registration successful.');

    this.request.post(
        this.baseUrl,
        userData
    );
    this.router.navigate(["login"]);

  }

  get f() { return this.registerForm.controls; }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  validatePassword(password: string, confirmPassword: string) {
     return password == confirmPassword;
  }
 

}
