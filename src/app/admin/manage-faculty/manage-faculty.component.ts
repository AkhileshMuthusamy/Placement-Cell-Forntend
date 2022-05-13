import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {RegisterUserComponent} from '../register-user/register-user.component';

@Component({
  selector: 'app-manage-faculty',
  templateUrl: './manage-faculty.component.html',
  styleUrls: ['./manage-faculty.component.scss']
})
export class ManageFacultyComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'email', 'gender', 'phone', 'role', 'disabled', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  isListLoading = false;
  totalLength = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    public dialog: MatDialog,
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.loadList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadList(): void {
    this.isListLoading = true;
    this.api.fetchUserList(['FACULTY', 'PLACEMENT']).subscribe({
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

  addFaculty(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '550px',
      data: {type: 'FACULTY', title: 'Faculty'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.loadList();
      }
    });
  }

  addPlacementFaculty(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '550px',
      data: {type: 'PLACEMENT', title: 'Placement Faculty'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.loadList();
      }
    });
  }

  openEditUserDialog(row: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '550px',
      data: {formData: row, title: 'Faculty'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.loadList();
      }
    });
  }

}
