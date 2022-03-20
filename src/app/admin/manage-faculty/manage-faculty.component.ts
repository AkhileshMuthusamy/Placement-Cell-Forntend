import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegisterUserComponent} from '../register-user/register-user.component';

@Component({
  selector: 'app-manage-faculty',
  templateUrl: './manage-faculty.component.html',
  styleUrls: ['./manage-faculty.component.scss']
})
export class ManageFacultyComponent implements OnInit {

  isLoading = false;
  
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addFaculty(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '550px',
      data: {type: 'FACULTY', title: 'Faculty'}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addPlacementFaculty(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '550px',
      data: {type: 'PLACEMENT', title: 'Placement Faculty'}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
