import { Component, OnInit } from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  profile: any;
  sideMenuOpened = true;
  sideMenuMode: 'over' | 'side' = 'over';

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public mediaObserver: MediaObserver,
    private router: Router
  ) {
    this.profile = this.authService.getUserProfile();

    mediaObserver.asObservable().subscribe((mediaChange) => {
      const screen = mediaChange[0].mqAlias;
      if (screen === 'xs') {
       this.sideMenuMode = 'over';
       this.sideMenuOpened = false;
      } else {
       this.sideMenuMode = 'side';
       this.sideMenuOpened = true;
      }
     });
  }

  ngOnInit(): void {
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  navigate(path: string): void {
    this.router.navigate([path]).then(() => { });
  }
}
