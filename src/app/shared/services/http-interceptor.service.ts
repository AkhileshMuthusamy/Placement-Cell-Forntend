import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(protected router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserLoggedIn()) {
      if (req.body instanceof FormData) {
        req = req.clone({
          setHeaders: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Accept: 'application/json',
            Authorization: `${this.authService.getToken()}`,
          },
        });
      } else {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Accept: 'application/json',
            Authorization: `${this.authService.getToken()}`,
          },
        });
      }
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event)
          if (event.body?.notification?.message) {
            this.snackBar.open( event.body?.notification?.message, 'Close', {duration: 5000});
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            if (error.error?.notification?.message) {
              this.snackBar.open( error.error?.notification?.message, 'Close', {duration: 5000});
            } else {
              this.snackBar.open( error.error.message, 'Close', {duration: 2000});
            }
          } else if (error.status === 0) {
            this.snackBar.open( 'Unknown error occurred', 'Close', {duration: 2000});
          } else if (error.status === 401) {
            this.authService.logoutAndNavigate();
          } else {
            this.snackBar.open( error.statusText, 'Close', {duration: 2000});
          }
        }
        return throwError(error);
      })
    );
  }

}
