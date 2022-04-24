import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';
import {AddSkillComponent} from './add-skill/add-skill.component';

@Component({
  selector: 'app-manage-skill',
  templateUrl: './manage-skill.component.html',
  styleUrls: ['./manage-skill.component.scss']
})
export class ManageSkillComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
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
    this.api.fetchSkillList().subscribe({
      next: (res: APIResponse<any>) => {
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

  addSkill(): void {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '570px',
      data: {formData: {}, mode: 'ADD'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.loadList();
      }
    });
  }

  deleteSkill(row: any): void {
    this.api.deleteSkill(row._id).subscribe({
      next: (res) => {
        if (!res.error) {
          this.loadList();
        }
      },
      error: (err) => {

      }
    })
  }

}
