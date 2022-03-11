import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'placement_cell_frontend';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isLoginSubject.subscribe(value => {
      if (value) {
        this.authService.navigateUserHome();
      } else {
        this.router.navigate(['/login']).then(() => {});
      }
    });
  }
}
