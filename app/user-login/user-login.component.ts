
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'] // Note the plural 'styleUrls' here
})

export class UserLoginComponent {
  constructor(private as:AuthenticationService,private router:Router,private openSnackBar:MatSnackBar) {}


  UserLoginData={
    emailId:'',
    password:'',
    
  }

login() {
  this.as.login(this.UserLoginData).subscribe(
    (response) => {
      const token = response.token;
      const role=response.role;
      alert(role)
      if (role === 'Admin') {
        this.as.isAdmin = true;
      } else if (role === 'User') {
        this.as.isUser = true;
      }
  
      console.log(this.as.isAdmin)
      if (token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('emailId',this.UserLoginData.emailId);
        sessionStorage.setItem('role', role);
      
        alert("Login Successful");
        this.router.navigateByUrl("/")
      }
      else {
        console.error("Token not found in the response body:", response.body);
      }
    },
    (error: { error: { error: string; }; }) => {
      if (error && error.error && error.error.error === "merchant already exists") {
          alert("merchant with the same email ID already exists. Please use a different email ID.")
      }    else {
        alert("Invalid credentials");
      }
    }
   );

}
}