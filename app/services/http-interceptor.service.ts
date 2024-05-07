import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private auth: AuthenticationService) { }

  // intercept(request: any, next: HttpHandler): Observable<any> {
  //   const token = this.auth.getToken(); 

  //   if (token) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //   }

  //   return next.handle(request);
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
