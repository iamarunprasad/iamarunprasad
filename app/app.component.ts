import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FoodieApplication';


  constructor(private storageService: AuthenticationService,private router:Router) {}

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any): void {
    this.storageService.clear(); // Clear session storage on beforeunload event
    this.router.navigateByUrl("/")
  }


}
