import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {EditFacultyProfileComponent} from 'src/app/faculty/edit-faculty-profile/edit-faculty-profile.component';
import {User} from 'src/app/shared/objects/global-objects';
import {DataService} from 'src/app/shared/services/data.service';
import {EditPlacementProfileComponent} from '../edit-placement-profile/edit-placement-profile.component';

@Component({
  selector: 'app-placement-profile',
  templateUrl: './placement-profile.component.html',
  styleUrls: ['./placement-profile.component.scss']
})
export class PlacementProfileComponent implements OnInit {

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
    const dialogRef = this.dialog.open(EditFacultyProfileComponent, {
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
