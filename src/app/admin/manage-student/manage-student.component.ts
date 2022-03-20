import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {DataService} from 'src/app/shared/services/data.service';
import {RegisterUserComponent} from '../register-user/register-user.component';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit, AfterViewInit {

  isLoading = false;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'email', 'gender', 'phone', 'disabled', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  isListLoading = false;
  totalLength = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  constructor(
    public dialog: MatDialog,
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.loadList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadList(): void {
    this.isListLoading = true;
    this.api.fetchUserList(['STUDENT']).subscribe({
      next: (res: APIResponse<Array<User>>) => {
        if (!res.error) {
          this.dataSource.data = res.data;
          this.totalLength = res.data.length;
        }
      },
      complete: () => {
        this.isListLoading = false;
      },
      error: () => {
        this.isListLoading = false;
      }
    });
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '550px',
      data: {type: 'STUDENT', title: 'Student'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadList();
    });
  }

  openEditUserDialog(row: any): void {
    
  }

}
