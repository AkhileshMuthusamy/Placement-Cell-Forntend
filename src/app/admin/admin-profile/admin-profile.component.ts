import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {User} from 'src/app/shared/objects/global-objects';
import {DataService} from 'src/app/shared/services/data.service';
import {EditAdminProfileComponent} from '../edit-admin-profile/edit-admin-profile.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  isLoading = false;
  profile!: User;

  $subscription!: Subscription;
  
  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.$subscription = this.dataService.getProfile().subscribe((profile: User | null) => {
      if (profile) {
        this.profile = profile;
        console.log(this.profile)
      }
    });
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditAdminProfileComponent, {
      width: '550px',
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SUCCESS') {
        this.dataService.loadProfile()
      }
    });
  }

}
