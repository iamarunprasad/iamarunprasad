import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  
  userEmail: string | null = '';
  constructor( private router:Router,public ass:AuthenticationService,private snackBar:MatSnackBar){}




  ngOnInit(): void {
    this.userEmail= sessionStorage.getItem('emailId');
  }

  
  // ngOnInit(): void {
    
  //  this.userEmail= sessionStorage.getItem('role'); // Corrected sessionStorage key
  // //   // if (userEmailFull) {
  // //   //   this.userEmail = userEmailFull.split('@')[0];
  // //   // }
  // }














  


  logout(): void {
    this.ass.logout(); // Call the logout method from AuthenticationService
  }


} 
