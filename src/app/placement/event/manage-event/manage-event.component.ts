import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';
import {AddEditEventComponent} from '../add-edit-event/add-edit-event.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['date', 'title', 'minCgpa', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isListLoading = false;
  totalLength = 0;

  currentDate = new Date();

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
    this.api.fetchEventList().subscribe({
      next: (res: APIResponse<Array<any>>) => {
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

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      width: '550px',
      data: {formData: {}, mode: 'ADD'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.loadList();
      }
    });
  }

  openEditEventDialog(row: any): void {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      width: '550px',
      data: {formData: row, mode: 'EDIT'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.loadList();
      }
    });
  }

  deleteEvent(row: any): void {
    this.api.deleteEvent(row._id).subscribe({
      next: (res) => {
        if (!res.error) {
          this.loadList();
        }
      },
      error: (err) => {

      }
    })
  }

  getDate(dt: string) {
    return new Date(dt);
  }

}
