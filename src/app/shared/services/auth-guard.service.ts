import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let canNavigate = false;

    if (route.url.length > 0) {
      if (route.url[0].path === 'admin') {
        canNavigate = this.authService.isAdmin()
      } else if (route.url[0].path === 'faculty') {
        canNavigate =  this.authService.isFaculty()
      } else if (route.url[0].path === 'placement') {
        canNavigate =  this.authService.isPlacement()
      }
    }

    if (!canNavigate) {
      this.snackBar.open('Invalid Access', 'Close', {duration: 4000});
      this.router.navigate(['/login']).then(() => {});
    }

    return canNavigate
  }
}
