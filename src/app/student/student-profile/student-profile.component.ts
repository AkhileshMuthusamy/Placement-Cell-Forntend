import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from 'src/app/shared/objects/global-objects';
import {DataService} from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  isLoading = false;
  profile!: User;

  $subscription!: Subscription;
  
  constructor(
    private dataService: DataService
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

  }

}
