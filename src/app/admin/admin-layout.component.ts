import { Component, OnInit } from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
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
    public mediaObserver: MediaObserver,
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

  openChangePassword(): void {

  }

  navigate(path: string): void {

  }
}
