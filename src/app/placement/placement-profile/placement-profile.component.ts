import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from 'src/app/shared/objects/global-objects';
import {DataService} from 'src/app/shared/services/data.service';

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
