import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {SendEmailComponent} from './send-email/send-email.component';

@Component({
  selector: 'app-skill-support',
  templateUrl: './skill-support.component.html',
  styleUrls: ['./skill-support.component.scss']
})
export class SkillSupportComponent implements OnInit, AfterViewInit {

  isLoading = false;
  displayedColumns: string[] = ['select', 'id', 'firstName', 'lastName', 'email', 'gender', 'phone', 'skills'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  isListLoading = false;
  totalLength = 0

  supportDisplayedColumns: string[] = ['createdAt', 'subject', 'batch', 'department', 'cgpa', 'skills'];
  supportDataSource = new MatTableDataSource<User>([]);
  isSupportListLoading = false;
  supportTotalLength = 0

  filterForm!: FormGroup;
  submitted = false;

  skills: Array<string> = [];
  departments: Array<string> = [];
  batches: Array<string> = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild('supportPaginator')
  supportPaginator!: MatPaginator;
  @ViewChild('supportTable', { read: MatSort, static: true })
  supportSort!: MatSort;
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialog: MatDialog,
  ) {
    this.createForm();
    this.loadSkillList();
    this.loadDepartmentList();
    this.loadBatchList();
    this.loadSupportList();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.supportDataSource.paginator = this.supportPaginator;
    this.supportDataSource.sort = this.supportSort;
  }

  createForm(): void {
    this.filterForm = this.fb.group({
      skills: [undefined, Validators.required],
      match: ['ANY'],
      cgpa: [],
      batch: [[]],
      department: [[]]
    });

  }

  get f(): any { return this.filterForm.controls; }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  loadSkillList(): void {
    this.isListLoading = true;
    this.api.getSkillList().subscribe({
      next: (res: APIResponse<Array<string>>) => {
        if (!res.error) {
          this.skills = res.data;
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

  loadDepartmentList(): void {
    this.isListLoading = true;
    this.api.getDepartmentList().subscribe({
      next: (res: APIResponse<Array<string>>) => {
        if (!res.error) {
          this.departments = res.data;
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

  loadBatchList(): void {
    this.isListLoading = true;
    this.api.getBatchList().subscribe({
      next: (res: APIResponse<Array<string>>) => {
        if (!res.error) {
          this.batches = res.data;
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

  loadSupportList(): void {
    this.isListLoading = true;
    this.api.getSupportList().subscribe({
      next: (res: APIResponse<Array<any>>) => {
        if (!res.error) {
          this.supportDataSource.data = res.data;
          this.supportTotalLength = res.data.length;
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

  filterStudent(): void {
    this.submitted = true;
    this.filterForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.filterForm.valid) {
      this.isListLoading = true;

      this.api.findStudentWithSkill(this.filterForm.getRawValue()).subscribe({
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
  }

  openSendEmailDialog(): void {
    
    const dialogRef = this.dialog.open(SendEmailComponent, {
      width: '570px',
      data: {
        ids: this.selection.selected.map(user => user.id),
        emails: this.selection.selected.map(user => user.email),
        ...this.filterForm.getRawValue()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SUCCESS') {
        this.loadSupportList();
      }
    });
  }

}
