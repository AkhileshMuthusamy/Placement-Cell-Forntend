import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-placement-layout',
  templateUrl: './placement-layout.component.html',
  styleUrls: ['./placement-layout.component.scss']
})
export class PlacementLayoutComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
