import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {AuthService} from '../shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {

  profile: any;
  sideMenuOpened = true;
  sideMenuMode: 'over' | 'side' = 'over';

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public mediaObserver: MediaObserver,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Student');
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
