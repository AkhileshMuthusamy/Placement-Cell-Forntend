import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-faculty-layout',
  templateUrl: './faculty-layout.component.html',
  styleUrls: ['./faculty-layout.component.scss']
})
export class FacultyLayoutComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
