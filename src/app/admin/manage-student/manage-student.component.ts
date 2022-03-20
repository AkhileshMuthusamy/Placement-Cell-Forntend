import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegisterUserComponent} from '../register-user/register-user.component';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

  isLoading = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '550px',
      data: {type: 'STUDENT', title: 'Student'}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
