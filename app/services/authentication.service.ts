import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService{
//   private token: string | null = null;

//   isAdmin: boolean = false;
//   isUser: boolean = false;

  

//   constructor(private  httpClient: HttpClient,private router:Router) {
//     // this.token = sessionStorage.getItem('token');
//     this.checkLoggedInStatus();
  
//   }

//   private checkLoggedInStatus(): void {
//     const role = sessionStorage.getItem('role');
//     if (role === 'Admin') {
//       this.isAdmin = true;
//       this.isUser = false;
//     } else if (role === 'User') {
//       this.isAdmin = false;
//       this.isUser = true;
//     } else {
//       this.isAdmin = false;
//       this.isUser = false;
//     }
//   }

//   // isLoggedIn(): boolean {
//   //   return this.isUser; // Return true if the user is logged in, false otherwise
//   // }
 
//   setToken(token: string): void {
//     this.token = token;
//     sessionStorage.setItem('token', token);
//   }

//   getToken(): string | null {
//     return this.token;
//   }

//   login(credentials:any): Observable<any>{
//     return this.httpClient.post<any>("http://localhost:8088/api/v1/login", credentials)
// }
// isLoggedIn(): boolean {
//   return !!this.token; // Return true if the token is present, false otherwise
// }
  
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private token: string | null = null;
    isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private  httpClient: HttpClient,private router:Router) {
    this.loadToken();
  }

  private loadToken(): void {
    this.token = sessionStorage.getItem(this.tokenKey);
    if (!this.token) {
      this.removeToken();
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
  login(credentials:any): Observable<any>{
        return this.httpClient.post<any>("http://localhost:8088/api/v1/login", credentials)
    }


  clear(): void {
    sessionStorage.clear();
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  
  logout(): void {
    this.removeToken(); // Remove token from session storage
    this.isAdmin=false;
    this.isUser=false;
    sessionStorage.clear()
    this.router.navigateByUrl('/'); // Navigate to login page after logout
  }

 

  
}