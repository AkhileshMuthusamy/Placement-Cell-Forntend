import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {User} from 'src/app/shared/objects/global-objects';
import {DataService} from 'src/app/shared/services/data.service';
import {EditFacultyProfileComponent} from '../edit-faculty-profile/edit-faculty-profile.component';

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.scss']
})
export class FacultyProfileComponent implements OnInit {

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
